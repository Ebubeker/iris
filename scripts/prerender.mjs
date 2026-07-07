// Post-build prerender step.
// Loads the built SPA in a headless browser, lets React + Supabase render,
// and snapshots the resulting HTML for each route so Google sees real content.

import http from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sirv from 'sirv';
import puppeteer from 'puppeteer-core';
import { createClient } from '@supabase/supabase-js';

// Pick the right Chromium for the environment.
// Vercel build containers don't have the system libs that puppeteer's bundled
// Chrome needs (libnspr4.so etc.), so we use @sparticuz/chromium — a slim,
// self-contained build designed for serverless. Locally we use the full
// puppeteer package's bundled Chromium.
const isServerlessBuild = !!(process.env.VERCEL || process.env.CI);

async function getLaunchOptions() {
  if (isServerlessBuild) {
    const { default: chromium } = await import('@sparticuz/chromium');
    return {
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      headless: chromium.headless,
    };
  }
  const { default: fullPuppeteer } = await import('puppeteer');
  return {
    executablePath: await fullPuppeteer.executablePath(),
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY env vars');
  process.exit(1);
}

// Keep these service slugs in sync with src/data/services.tsx.
const SERVICE_SLUGS = [
  'salary-slip-analysis',
  'employment-contract-review',
  'authorities-liaison',
  'pension-review',
  'end-of-employment',
  'job-search-guidance',
  'personalized-recruitment',
];

const STATIC_ROUTES = [
  '/',
  '/about',
  '/faq',
  '/blogs',
  '/privacy-policy',
  '/terms-of-use',
  '/cookies-policy',
  '/accessibility-statement',
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
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

function startServer(shellHtml) {
  // sirv serves files that exist on disk. For any path that doesn't match
  // a real file we always return the ORIGINAL empty shell — never a
  // previously-prerendered file. This matters once we start overwriting
  // dist/index.html with the prerendered homepage: subsequent routes must
  // still get a clean shell with an empty <div id="root"></div>, otherwise
  // React fails to remount and the snapshot is junk.
  const serve = sirv(DIST, { single: false, dev: false });
  const server = http.createServer((req, res) => {
    serve(req, res, () => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(shellHtml);
    });
  });
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

  // Snapshot the original Vite-built shell before any prerendering overwrites it.
  const shellHtml = await readFile(join(DIST, 'index.html'), 'utf8');
  const { server, port } = await startServer(shellHtml);
  const launchOptions = await getLaunchOptions();
  console.log(`Using Chromium: ${launchOptions.executablePath}`);
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Capture browser console errors so silent failures surface
  page.on('pageerror', (err) => console.error('  [browser pageerror]', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('  [browser console.error]', msg.text());
  });

  const staticSet = new Set(STATIC_ROUTES);
  let ok = 0;
  let staticFailed = 0;
  let blogFailed = 0;
  for (const route of routes) {
    try {
      await snapshot(page, port, route);
      console.log(`  ok  ${route}`);
      ok++;
    } catch (err) {
      console.error(`  fail ${route}: ${err.message}`);
      if (staticSet.has(route)) staticFailed++;
      else blogFailed++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerender done: ${ok} succeeded, ${staticFailed} static failed, ${blogFailed} blog failed`);
  // Only fail the build if a core static route (home, services, about, ...) broke.
  // A single bad blog post must not block the entire deploy — it just won't be
  // prerendered and will still work as a client-rendered fallback.
  if (staticFailed > 0) {
    console.error('One or more static routes failed to prerender — failing the build.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Prerender crashed:', err);
  process.exit(1);
});
