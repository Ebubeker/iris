import { createClient } from '@supabase/supabase-js'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const SITE_URL = 'https://iris-hr.work'

const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/blogs', changefreq: 'daily', priority: '0.8' },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms-of-use', changefreq: 'yearly', priority: '0.3' },
  { loc: '/cookies-policy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/accessibility-statement', changefreq: 'yearly', priority: '0.3' },
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    res.status(500).send('Missing Supabase environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, updated_at')
    .order('created_at', { ascending: false })

  const staticEntries = staticPages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')

  const blogEntries = (posts || [])
    .map(
      (post) => `  <url>
    <loc>${SITE_URL}/blogs/${post.id}</loc>
    <lastmod>${post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).send(sitemap)
}
