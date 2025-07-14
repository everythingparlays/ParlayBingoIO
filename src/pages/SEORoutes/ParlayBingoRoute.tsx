import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

const ParlayBingoRoute: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { replace: true })
    
    // Use a longer delay to ensure lazy-loaded components render before scrolling
    setTimeout(() => {
      const aboutSection = document.getElementById('about-us')
      if (aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        const newWaySection = document.querySelector('[class*="new-way-to-play"]')
        if (newWaySection) {
          newWaySection.scrollIntoView({ 
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
        <title>Parlay Bingo - Social Sports Betting Game by OverBoard Sports</title>
        <meta name="description" content="Experience parlay bingo - the revolutionary social sports betting game. Fill bingo cards with sports outcomes, compete with friends at bars, and win cash prizes." />
        <meta name="keywords" content="parlay bingo, social sports betting, bingo sports game, overboard sports, sports bingo card, competitive betting" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://overboardsports.com/parlay-bingo" />
        <meta property="og:title" content="Parlay Bingo - Social Sports Betting Game by OverBoard Sports" />
        <meta property="og:description" content="Experience parlay bingo - the revolutionary social sports betting game. Fill bingo cards with sports outcomes and compete with friends." />
        <meta property="og:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://overboardsports.com/parlay-bingo" />
        <meta property="twitter:title" content="Parlay Bingo - Social Sports Betting Game by OverBoard Sports" />
        <meta property="twitter:description" content="Experience parlay bingo - the revolutionary social sports betting game. Fill bingo cards with sports outcomes and compete with friends." />
        <meta property="twitter:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        <link rel="canonical" href="https://overboardsports.com/parlay-bingo" />
      </Helmet>
      
      {/* This component immediately redirects, so no visible content needed */}
      <div style={{ display: 'none' }}>Redirecting to Parlay Bingo section...</div>
    </>
  )
}

export default ParlayBingoRoute