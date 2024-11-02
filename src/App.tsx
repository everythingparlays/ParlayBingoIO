import React, { useEffect } from 'react'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { Route, Routes, useLocation } from 'react-router-dom'
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

  // Track page views
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get('referrer');

    const additionalData = referrer ? { referrer } : {};

    analytics.track(`Page View - ${location.pathname}`, additionalData);
    console.log("Pathname: ", location.pathname);
  }, [location.pathname])

  return (
    <ThemeProvider>
      <Routes>
        <Route element={<HeaderAndFooter />}>
          <Route path="/" element={<Landing />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/download" element={<DownloadPage />} />
        </Route>
        <Route path="/contest/:id" element={<Leaderboard />} />
        <Route path="/contest/redirect/:id" element={<SingleContestRedirectPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
