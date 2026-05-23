// Post-build prerender step.
// Loads the built SPA in a headless browser, lets React + Supabase render,
// and snapshots the resulting HTML for each route so Google sees real content.

import http from 'node:http';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sirv from 'sirv';
import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY env vars');
  process.exit(1);
}

const STATIC_ROUTES = [
  '/',
  '/about',
  '/faq',
  '/blogs',
  '/privacy-policy',
  '/terms-of-use',
  '/cookies-policy',
  '/accessibility-statement',
];

async function getBlogRoutes() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data, error } = await supabase.from('blog_posts').select('id');
  if (error) {
    console.error('Failed to fetch blog posts from Supabase:', error.message);
    return [];
  }
  return (data || []).map((p) => `/blogs/${p.id}`);
}

function startServer() {
  const serve = sirv(DIST, { single: true, dev: false });
  const server = http.createServer((req, res) => serve(req, res, () => res.end()));
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function snapshot(page, port, route) {
  const url = `http://127.0.0.1:${port}${route}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for React to actually mount and render real content into #root
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return root && root.children.length > 0 && root.innerText.trim().length > 50;
    },
    { timeout: 20000 }
  );

  // For blog detail pages, wait for the article content specifically
  if (route.startsWith('/blogs/') && route !== '/blogs') {
    await page.waitForSelector('article', { timeout: 15000 }).catch(() => {});
    // Wait for the article body to have real text (not just the loading skeleton)
    await page.waitForFunction(
      () => {
        const article = document.querySelector('article');
        return article && article.innerText.trim().length > 100;
      },
      { timeout: 15000 }
    ).catch(() => {});
  }

  // Small settle delay for helmet to flush any pending head updates
  await new Promise((r) => setTimeout(r, 500));

  const html = await page.content();
  const outPath = route === '/'
    ? join(DIST, 'index.html')
    : join(DIST, route.slice(1), 'index.html');
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');
}

async function main() {
  console.log('Fetching blog post list from Supabase...');
  const blogRoutes = await getBlogRoutes();
  const routes = [...STATIC_ROUTES, ...blogRoutes];
  console.log(`Will prerender ${routes.length} routes (${STATIC_ROUTES.length} static + ${blogRoutes.length} blog posts)`);

  const { server, port } = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Capture browser console errors so silent failures surface
  page.on('pageerror', (err) => console.error('  [browser pageerror]', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('  [browser console.error]', msg.text());
  });

  let ok = 0;
  let failed = 0;
  for (const route of routes) {
    try {
      await snapshot(page, port, route);
      console.log(`  ok  ${route}`);
      ok++;
    } catch (err) {
      console.error(`  fail ${route}: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerender done: ${ok} succeeded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Prerender crashed:', err);
  process.exit(1);
});
