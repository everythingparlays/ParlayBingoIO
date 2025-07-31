import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { resolve } from 'path'

const hostname = 'https://overboardsports.com'

const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/help-center', changefreq: 'monthly', priority: 0.8 },
  { url: '/contests', changefreq: 'daily', priority: 0.9 },
  { url: '/download', changefreq: 'monthly', priority: 0.7 },

  // SEO Routes
  {
    url: '/how-to-play-overboard-sports',
    changefreq: 'monthly',
    priority: 0.8,
  },
  { url: '/parlay-bingo', changefreq: 'monthly', priority: 0.8 },
  { url: '/overboardsports-promo-code', changefreq: 'weekly', priority: 0.9 },
  {
    url: '/daily-fantasy-sports-california',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    url: '/daily-fantasy-sports-florida',
    changefreq: 'monthly',
    priority: 0.8,
  },
  { url: '/daily-fantasy-sports-nba', changefreq: 'weekly', priority: 0.8 },
  { url: '/daily-fantasy-sports-nfl', changefreq: 'weekly', priority: 0.8 },
  { url: '/daily-fantasy-sports-mlb', changefreq: 'weekly', priority: 0.8 },
]

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname })
  const writeStream = createWriteStream(resolve('public/sitemap.xml'))

  sitemap.pipe(writeStream)

  routes.forEach((route) => {
    sitemap.write({
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod: new Date().toISOString().split('T')[0],
    })
  })

  sitemap.end()

  const sitemapXML = await streamToPromise(sitemap)
  console.log('✅ Sitemap generated successfully!')
  return sitemapXML
}

generateSitemap().catch(console.error)
