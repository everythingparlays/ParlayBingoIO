import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'

interface DailyFantasySportsRouteProps {
  state?: string
  sport?: string
}

const DailyFantasySportsRoute: React.FC<DailyFantasySportsRouteProps> = ({ state, sport }) => {
  const navigate = useNavigate()
  const params = useParams()

  // Determine the specific type from URL or props
  const getSpecificType = () => {
    if (state) return state
    if (sport) return sport
    if (params.type) return params.type
    return 'general'
  }

  const specificType = getSpecificType()

  // Generate dynamic content based on type
  const getMetaContent = () => {
    const baseTitle = "Daily Fantasy Sports"
    const baseDescription = "Join daily fantasy sports contests with OverBoard Sports. Experience parlay bingo gameplay"
    
    switch (specificType) {
      case 'california':
        return {
          title: `${baseTitle} California - Legal DFS Games & Contests`,
          description: `${baseDescription} in California. Legal daily fantasy sports with cash prizes available throughout the Golden State.`,
          keywords: "daily fantasy sports california, legal dfs california, sports contests california, overboard sports california"
        }
      case 'florida':
        return {
          title: `${baseTitle} Florida - Legal DFS Games & Contests`,
          description: `${baseDescription} in Florida. Legal daily fantasy sports with cash prizes available throughout the Sunshine State.`,
          keywords: "daily fantasy sports florida, legal dfs florida, sports contests florida, overboard sports florida"
        }
      case 'nba':
        return {
          title: `${baseTitle} NBA - Basketball Parlay Bingo Contests`,
          description: `${baseDescription} with NBA basketball. Create bingo cards with NBA game outcomes and compete for prizes.`,
          keywords: "daily fantasy sports nba, nba parlay bingo, basketball contests, nba overboard sports"
        }
      case 'nfl':
        return {
          title: `${baseTitle} NFL - Football Parlay Bingo Contests`,
          description: `${baseDescription} with NFL football. Create bingo cards with NFL game outcomes and compete for prizes.`,
          keywords: "daily fantasy sports nfl, nfl parlay bingo, football contests, nfl overboard sports"
        }
      case 'mlb':
        return {
          title: `${baseTitle} MLB - Baseball Parlay Bingo Contests`,
          description: `${baseDescription} with MLB baseball. Create bingo cards with MLB game outcomes and compete for prizes.`,
          keywords: "daily fantasy sports mlb, mlb parlay bingo, baseball contests, mlb overboard sports"
        }
      default:
        return {
          title: `${baseTitle} - Legal DFS Games & Contests by OverBoard Sports`,
          description: `${baseDescription}. Legal daily fantasy sports with unique bingo-style gameplay and cash prizes.`,
          keywords: "daily fantasy sports, legal dfs, sports contests, parlay bingo, overboard sports"
        }
    }
  }

  const metaContent = getMetaContent()

  useEffect(() => {
    navigate('/', { replace: true })
    
    setTimeout(() => {
      const aboutSection = document.getElementById('where-to-play')
      if (aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        const newWaySection = document.querySelector('[id*="where-to-play"]')
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
        <title>{metaContent.title}</title>
        <meta name="description" content={metaContent.description} />
        <meta name="keywords" content={metaContent.keywords} />
        
        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://overboardsports.com/daily-fantasy-sports-${specificType}`} />
        <meta property="og:title" content={metaContent.title} />
        <meta property="og:description" content={metaContent.description} />
        <meta property="og:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://overboardsports.com/daily-fantasy-sports-${specificType}`} />
        <meta property="twitter:title" content={metaContent.title} />
        <meta property="twitter:description" content={metaContent.description} />
        <meta property="twitter:image" content="https://overboardsports.com/OB-rebrand.png" />
        
        <link rel="canonical" href={`https://overboardsports.com/daily-fantasy-sports-${specificType}`} />
      </Helmet>
      
      {/* This component immediately redirects, so no visible content needed */}
      <div style={{ display: 'none' }}>Redirecting to Daily Fantasy Sports section...</div>
    </>
  )
}

export default DailyFantasySportsRoute