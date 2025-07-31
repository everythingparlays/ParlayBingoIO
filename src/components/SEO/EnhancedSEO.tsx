import React from 'react'
import { Helmet } from 'react-helmet-async'

interface EnhancedSEOProps {
  title: string
  description: string
  keywords: string
  canonical: string
  ogImage?: string
  sport?: string
  state?: string
  pageType?: string
  noIndex?: boolean
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://overboardsports.com/OB-rebrand.png',
  sport,
  state,
  pageType,
  noIndex = false,
}) => {
  // Generate enhanced keywords
  const getEnhancedKeywords = () => {
    const baseKeywords = keywords.split(', ')
    const dfsKeywords = [
      'daily fantasy sports',
      'parlay bingo',
      'overboard sports',
      'sports betting bingo',
      'fantasy sports app',
      'cash prizes sports',
    ]

    if (sport) {
      dfsKeywords.push(
        `daily fantasy ${sport}`,
        `${sport} bingo`,
        `${sport} parlay`,
        `fantasy ${sport} app`
      )
    }

    if (state) {
      dfsKeywords.push(
        `daily fantasy sports ${state}`,
        `${state} fantasy sports`,
        `legal fantasy sports ${state}`
      )
    }

    return [...baseKeywords, ...dfsKeywords].join(', ')
  }

  // Generate article tags for better categorization
  const getArticleTags = () => {
    const tags = ['Daily Fantasy Sports', 'Parlay Bingo', 'OverBoard Sports']

    if (sport) tags.push(sport.toUpperCase())
    if (state) tags.push(state.charAt(0).toUpperCase() + state.slice(1))
    if (pageType === 'how-to-play') tags.push('Tutorial', 'Rules', 'Guide')
    if (pageType === 'promo-code') tags.push('Promo Code', 'Free Play', 'Bonus')

    return tags
  }

  return (
    <Helmet>
      {/* Enhanced Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={getEnhancedKeywords()} />
      <link rel="canonical" href={canonical} />

      {/* Robots and Indexing */}
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />
      <meta
        name="googlebot"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />

      {/* Enhanced Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="OverBoard Sports - Daily Fantasy Sports Parlay Bingo"
      />
      <meta property="og:site_name" content="OverBoard Sports" />
      <meta property="og:locale" content="en_US" />

      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@OverBoardSports" />
      <meta name="twitter:creator" content="@OverBoardSports" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="twitter:image:alt"
        content="OverBoard Sports - Daily Fantasy Sports Parlay Bingo"
      />

      {/* Additional SEO Meta Tags */}
      <meta name="language" content="English" />
      <meta name="author" content="OverBoard Sports" />
      <meta name="publisher" content="OverBoard Sports" />
      <meta name="copyright" content="OverBoard Sports" />
      <meta name="application-name" content="OverBoard Sports" />
      <meta name="theme-color" content="#303083" />

      {/* Article/Content Tags */}
      <meta name="article:author" content="OverBoard Sports" />
      <meta name="article:publisher" content="https://overboardsports.com" />
      <meta name="article:tag" content={getArticleTags().join(', ')} />

      {/* Geo Tags for State-specific pages */}
      {state && (
        <>
          <meta name="geo.region" content={`US-${getStateCode(state)}`} />
          <meta
            name="geo.placename"
            content={state.charAt(0).toUpperCase() + state.slice(1)}
          />
          <meta name="geo.position" content={getStateCoordinates(state)} />
          <meta name="ICBM" content={getStateCoordinates(state)} />
        </>
      )}

      {/* Sport-specific tags */}
      {sport && (
        <>
          <meta
            name="category"
            content={`Daily Fantasy Sports ${sport.toUpperCase()}`}
          />
          <meta
            name="news_keywords"
            content={`${sport}, daily fantasy sports, parlay bingo`}
          />
        </>
      )}

      {/* App-specific tags */}
      <meta name="apple-itunes-app" content="app-id=1665470403" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="OverBoard Sports" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.segment.com" />
    </Helmet>
  )
}

// Helper functions
const getStateCode = (state: string): string => {
  const stateCodes: { [key: string]: string } = {
    california: 'CA',
    florida: 'FL',
    // Add more as needed
  }
  return stateCodes[state.toLowerCase()] || state.toUpperCase().slice(0, 2)
}

const getStateCoordinates = (state: string): string => {
  const coordinates: { [key: string]: string } = {
    california: '36.7783,-119.4179',
    florida: '27.7663,-82.6404',
    // Add more as needed
  }
  return coordinates[state.toLowerCase()] || '39.8283,-98.5795' // Default to US center
}

export default EnhancedSEO
