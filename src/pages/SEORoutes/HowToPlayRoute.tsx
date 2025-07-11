import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

const HowToPlayRoute: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Navigate to landing page and scroll to how-to-play section
    navigate('/', { replace: true })
    
    // Use a longer delay to ensure lazy-loaded components render before scrolling
    setTimeout(() => {
      const howToPlaySection = document.getElementById('how-to-play')
      if (howToPlaySection) {
        howToPlaySection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        // Fallback: try to find the FourEasySteps section directly
        const stepsSection = document.querySelector('[class*="section"]')
        if (stepsSection) {
          stepsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }, 300)
  }, [navigate])

  return (
    <>
      <Helmet>
        <title>How to Play OverBoard Sports - Parlay Bingo Rules & Guide</title>
        <meta name="description" content="Learn how to play OverBoard Sports parlay bingo in 4 easy steps. Complete your bingo card with sports bet outcomes and compete for cash prizes at local venues." />
        <meta name="keywords" content="how to play overboard sports, parlay bingo rules, sports betting guide, bingo card sports, overboard tutorial" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://overboardsports.com/how-to-play-overboard-sports" />
        <meta property="og:title" content="How to Play OverBoard Sports - Parlay Bingo Rules & Guide" />
        <meta property="og:description" content="Learn how to play OverBoard Sports parlay bingo in 4 easy steps. Complete your bingo card with sports bet outcomes and compete for cash prizes." />
        <meta property="og:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://overboardsports.com/how-to-play-overboard-sports" />
        <meta property="twitter:title" content="How to Play OverBoard Sports - Parlay Bingo Rules & Guide" />
        <meta property="twitter:description" content="Learn how to play OverBoard Sports parlay bingo in 4 easy steps. Complete your bingo card with sports bet outcomes and compete for cash prizes." />
        <meta property="twitter:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        <link rel="canonical" href="https://overboardsports.com/how-to-play-overboard-sports" />
      </Helmet>
      
      {/* This component immediately redirects, so no visible content needed */}
      <div style={{ display: 'none' }}>Redirecting to How to Play section...</div>
    </>
  )
}

export default HowToPlayRoute