import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

const PromoCodeRoute: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { replace: true })
    
    setTimeout(() => {
      const mapSection = document.getElementById('where-to-play')
      if (mapSection) {
        mapSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        // Fallback: try to find the Map section directly
        const mapSectionFallback = document.querySelector('[class*="map-section"]')
        if (mapSectionFallback) {
          mapSectionFallback.scrollIntoView({ 
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
        <title>OverBoard Sports Promo Code - Free Bonus & Offers</title>
        <meta name="description" content="Get the latest OverBoard Sports promo codes and bonus offers. Join free contests, compete for cash prizes, and unlock exclusive rewards at participating venues." />
        <meta name="keywords" content="overboard sports promo code, sports betting bonus, free contest entry, overboard discount, parlay bingo promo" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://overboardsports.com/overboardsports-promo-code" />
        <meta property="og:title" content="OverBoard Sports Promo Code - Free Bonus & Offers" />
        <meta property="og:description" content="Get the latest OverBoard Sports promo codes and bonus offers. Join free contests and compete for cash prizes." />
        <meta property="og:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://overboardsports.com/overboardsports-promo-code" />
        <meta property="twitter:title" content="OverBoard Sports Promo Code - Free Bonus & Offers" />
        <meta property="twitter:description" content="Get the latest OverBoard Sports promo codes and bonus offers. Join free contests and compete for cash prizes." />
        <meta property="twitter:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        <link rel="canonical" href="https://overboardsports.com/overboardsports-promo-code" />
      </Helmet>
      
      {/* This component immediately redirects, so no visible content needed */}
      <div style={{ display: 'none' }}>Redirecting to promo section...</div>
    </>
  )
}

export default PromoCodeRoute