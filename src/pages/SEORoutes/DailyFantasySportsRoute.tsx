import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EnhancedSEO from 'components/SEO/EnhancedSEO'
import DFSSchema from 'components/SEO/DFSSchema'

interface DailyFantasySportsRouteProps {
  sport?: string
  state?: string
}

const DailyFantasySportsRoute: React.FC<DailyFantasySportsRouteProps> = ({
  sport,
  state,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { replace: true })
    setTimeout(() => {
      const targetSection =
        document.getElementById('new-way-to-play') ||
        document.querySelector('[class*="new-way"]')
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }, [navigate])

  const getTitle = () => {
    if (sport)
      return `Daily Fantasy Sports ${sport.toUpperCase()} - OverBoard Sports Parlay Bingo`
    if (state)
      return `Daily Fantasy Sports in ${
        state.charAt(0).toUpperCase() + state.slice(1)
      } | OverBoard Sports`
    return 'Daily Fantasy Sports - OverBoard Sports'
  }

  const getDescription = () => {
    if (sport)
      return `Play daily fantasy sports ${sport.toUpperCase()} with OverBoard Sports parlay bingo. Complete your bingo card with ${sport} betting outcomes and win cash prizes at local venues.`
    if (state)
      return `Play daily fantasy sports in ${
        state.charAt(0).toUpperCase() + state.slice(1)
      } with OverBoard Sports. Legal parlay bingo game available at participating venues.`
    return 'Play daily fantasy sports with OverBoard Sports parlay bingo. Complete your bingo card with sports betting outcomes and win cash prizes.'
  }

  const getKeywords = () => {
    const base =
      'daily fantasy sports, parlay bingo, overboard sports, fantasy sports app'
    if (sport)
      return `${base}, daily fantasy ${sport}, ${sport} bingo, ${sport} parlay, fantasy ${sport} app`
    if (state)
      return `${base}, daily fantasy sports ${state}, ${state} fantasy sports, legal fantasy sports ${state}`
    return base
  }

  const getCanonical = () => {
    if (sport)
      return `https://overboardsports.com/daily-fantasy-sports-${sport}`
    if (state)
      return `https://overboardsports.com/daily-fantasy-sports-${state}`
    return 'https://overboardsports.com'
  }

  return (
    <>
      <EnhancedSEO
        title={getTitle()}
        description={getDescription()}
        keywords={getKeywords()}
        canonical={getCanonical()}
        sport={sport}
        state={state}
        pageType={sport ? 'dfs-sport' : 'dfs-state'}
      />

      <DFSSchema
        sport={sport}
        state={state}
        pageType={sport ? 'dfs-sport' : 'dfs-state'}
      />

      <div style={{ display: 'none' }}>
        Redirecting to Daily Fantasy Sports section...
      </div>
    </>
  )
}

export default DailyFantasySportsRoute
