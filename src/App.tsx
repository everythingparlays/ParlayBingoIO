import React, { useEffect, Suspense, lazy } from 'react'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'context/ThemeContext'
import HeaderAndFooter from 'layout/HeaderAndFooter'
import LoadingFallback from 'components/LoadingFallback/LoadingFallback'

// Lazy load page components
const Landing = lazy(() => import('pages/Landing/Landing'))
const HelpCenter = lazy(() => import('pages/Help Center/HelpCenter'))
const Leaderboard = lazy(() => import('pages/Leaderboard/Leaderboard'))
const Contests = lazy(() => import('pages/Contests/Contests'))
const DownloadPage = lazy(() => import('pages/Download/Download'))
const SingleContestRedirectPage = lazy(
  () => import('pages/ContestRedirects/SingleContestRedirect')
)
const HowToPlayRoute = lazy(() => import('pages/SEORoutes/HowToPlayRoute'))
const ParlayBingoRoute = lazy(() => import('pages/SEORoutes/ParlayBingoRoute'))
const PromoCodeRoute = lazy(() => import('pages/SEORoutes/PromoCodeRoute'))
const DailyFantasySportsRoute = lazy(
  () => import('pages/SEORoutes/DailyFantasySportsRoute')
)

// Initialize Segment Analytics
export const analytics = AnalyticsBrowser.load({
  writeKey: '93rA6ZPlv0GkzFZBQzxuOCadSi6ZKf1B',
})

const awsconfig = {
  Auth: {
    identityPoolId: 'us-east-2:147f3af9-4f32-4305-9f83-080a1a5f3469',
    region: `us-east-2`,
    identityPoolRegion: `us-east-2`,
    userPoolId: `us-east-2_ce96FqQEQ`,
    userPoolWebClientId: `oqjt4g1v9iun0fliggkb7cfjh`,
  },
  API: {
    endpoints: [
      {
        name: 'ClientApi',
        endpoint: 'https://d7hwmlam1e.execute-api.us-east-2.amazonaws.com/dev',
        region: 'us-east-2',
      },
    ],
  },
}

export const baseUrl = awsconfig.API.endpoints[0].endpoint

function App() {
  const location = useLocation()

  // Scroll to the top of the page when the user changes pages
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Suspense
          fallback={<LoadingFallback height="100vh" message="Loading..." />}
        >
          <Routes>
            <Route element={<HeaderAndFooter />}>
              <Route path="/" element={<Landing />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/contests" element={<Contests />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/app" element={<DownloadPage />} />

              {/* SEO Routes that redirect to landing page sections */}
              <Route
                path="/how-to-play-overboard-sports"
                element={<HowToPlayRoute />}
              />
              <Route path="/parlay-bingo" element={<ParlayBingoRoute />} />
              <Route
                path="/overboardsports-promo-code"
                element={<PromoCodeRoute />}
              />
              <Route
                path="/daily-fantasy-sports-california"
                element={<DailyFantasySportsRoute state="california" />}
              />
              <Route
                path="/daily-fantasy-sports-florida"
                element={<DailyFantasySportsRoute state="florida" />}
              />
              <Route
                path="/daily-fantasy-sports-nba"
                element={<DailyFantasySportsRoute sport="nba" />}
              />
              <Route
                path="/daily-fantasy-sports-nfl"
                element={<DailyFantasySportsRoute sport="nfl" />}
              />
              <Route
                path="/daily-fantasy-sports-mlb"
                element={<DailyFantasySportsRoute sport="mlb" />}
              />
            </Route>
            <Route path="/contest/:id" element={<Leaderboard />} />
            <Route
              path="/contest/redirect/:id"
              element={<SingleContestRedirectPage />}
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
