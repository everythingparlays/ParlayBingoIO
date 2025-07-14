import React, { useEffect } from 'react'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'context/ThemeContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Landing from 'pages/Landing/Landing'
import HelpCenter from 'pages/Help Center/HelpCenter'
import Leaderboard from 'pages/Leaderboard/Leaderboard'
import HeaderAndFooter from 'layout/HeaderAndFooter'
import Contests from 'pages/Contests/Contests'
import DownloadPage from 'pages/Download/Download'
import SingleContestRedirectPage from 'pages/ContestRedirects/SingleContestRedirect'
import HowToPlayRoute from 'pages/SEORoutes/HowToPlayRoute'
import ParlayBingoRoute from 'pages/SEORoutes/ParlayBingoRoute'
import PromoCodeRoute from 'pages/SEORoutes/PromoCodeRoute'
import DailyFantasySportsRoute from 'pages/SEORoutes/DailyFantasySportsRoute'

// Initialize Segment Analytics
export const analytics = AnalyticsBrowser.load({ writeKey: '93rA6ZPlv0GkzFZBQzxuOCadSi6ZKf1B' })

const awsconfig = {
  Auth: {
    identityPoolId: "us-east-2:147f3af9-4f32-4305-9f83-080a1a5f3469",
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
};

export const baseUrl = awsconfig.API.endpoints[0].endpoint;

function App() {
  const location = useLocation()

  gsap.registerPlugin(ScrollTrigger)

  // Scroll to the top of the page when the user changes pages
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Routes>
          <Route element={<HeaderAndFooter />}>
            <Route path="/" element={<Landing />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/download" element={<DownloadPage />} />
            
            {/* SEO Routes that redirect to landing page sections */}
            <Route path="/how-to-play-overboard-sports" element={<HowToPlayRoute />} />
            <Route path="/parlay-bingo" element={<ParlayBingoRoute />} />
            <Route path="/overboardsports-promo-code" element={<PromoCodeRoute />} />
            <Route path="/daily-fantasy-sports-california" element={<DailyFantasySportsRoute state="california" />} />
            <Route path="/daily-fantasy-sports-florida" element={<DailyFantasySportsRoute state="florida" />} />
            <Route path="/daily-fantasy-sports-nba" element={<DailyFantasySportsRoute sport="nba" />} />
            <Route path="/daily-fantasy-sports-nfl" element={<DailyFantasySportsRoute sport="nfl" />} />
            <Route path="/daily-fantasy-sports-mlb" element={<DailyFantasySportsRoute sport="mlb" />} />
          </Route>
          <Route path="/contest/:id" element={<Leaderboard />} />
          <Route path="/contest/redirect/:id" element={<SingleContestRedirectPage />} />
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
