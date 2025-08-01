import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const seoUrls = [
  'https://overboardsports.com',
  'https://overboardsports.com/how-to-play-overboard-sports',
  'https://overboardsports.com/parlay-bingo',
  'https://overboardsports.com/daily-fantasy-sports-nfl',
  'https://overboardsports.com/daily-fantasy-sports-california',
]

async function runSEOAudit() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })

  console.log('🔍 Running SEO Performance Tests...\n')

  for (const url of seoUrls) {
    console.log(`Testing: ${url}`)

    const runnerResult = await lighthouse(url, {
      port: chrome.port,
      onlyCategories: ['performance', 'seo', 'accessibility'],
      formFactor: 'mobile',
    })

    if (!runnerResult || !runnerResult.lhr) continue

    const { lhr } = runnerResult

    console.log(
      `  📊 Performance: ${Math.round(
        (lhr.categories.performance.score ?? 0) * 100
      )}/100`
    )
    console.log(`  🔍 SEO: ${Math.round((lhr.categories.seo.score ?? 0) * 100)}/100`)
    console.log(
      `  ♿ Accessibility: ${Math.round(
        (lhr.categories.accessibility.score ?? 0) * 100
      )}/100`
    )
    console.log(
      `  ⚡ LCP: ${(
        (lhr.audits['largest-contentful-paint']?.numericValue ?? 0) / 1000
      ).toFixed(2)}s`
    )
    console.log(
      `  📱 CLS: ${(lhr.audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(
        3
      )}\n`
    )
  }

  await chrome.kill()
  console.log('✅ SEO Audit Complete!')
}

runSEOAudit().catch(console.error)
