import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EnhancedSEO from 'components/SEO/EnhancedSEO'
import DFSSchema from 'components/SEO/DFSSchema'

const HowToPlayRoute: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { replace: true })

    setTimeout(() => {
      const howToPlaySection = document.getElementById('how-to-play')
      if (howToPlaySection) {
        howToPlaySection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      } else {
        const stepsSection = document.querySelector('[class*="section"]')
        if (stepsSection) {
          stepsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    }, 300)
  }, [navigate])

  return (
    <>
      <EnhancedSEO
        title="How to Play OverBoard Sports - Parlay Bingo Rules & Tutorial"
        description="Learn how to play OverBoard Sports parlay bingo in 4 easy steps. Complete your bingo card with sports bet outcomes and compete for cash prizes at local venues."
        keywords="how to play overboard sports, parlay bingo rules, sports betting guide, bingo card sports, overboard tutorial, daily fantasy sports guide"
        canonical="https://overboardsports.com/how-to-play-overboard-sports"
        pageType="how-to-play"
      />

      <DFSSchema pageType="how-to-play" />

      <div style={{ display: 'none' }}>
        Redirecting to How to Play section...
      </div>
    </>
  )
}

export default HowToPlayRoute
