import React from 'react'
import ThreeInARowBonus from 'components/svg/ThreeInARowBonus'
import NewToPlaySquare from 'components/svg/NewToPlaySquare'
import LeftNewToPlayBlocks from 'components/svg/LeftNewToPlayBlocks'
import RightNewToPlayBlocks from 'components/svg/RightNewToPlayBlocks'
import CashBag from 'components/svg/CashBag'
import Sports from 'components/svg/Sports'
import Whistle from 'components/svg/Whistle'
import styles from '../styles/NewWayToPlay.module.css'
import Button from 'ui/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { trackDownloadButton, trackAppDownloadRedirect } from 'services/analytics'
import Features from 'components/Features/Features'
import { newToPlayFeatures } from 'data/NewToPlayFeatures'
import LinearGradient from 'ui/LinearGradient'
import ThreeInARow from 'components/svg/ThreeInARow'

type Props = {}

function NewWayToPlay({}: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <section id={styles['section']}>
      {/* Left side */}
      <div className={styles['left-side']}>
        {/* SVG stuff */}
        <div className={styles['svg-container']}>
          {/* SVGs goes by 0 for square and 1 for phone and the badge should be on top*/}
          <div className={styles['svg-square']}>
            <NewToPlaySquare />
          </div>
          <div className={styles['svg-badge']}>
            <ThreeInARow width="185" height="145" />
          </div>
          <div className={styles['svg-phone']}>
            {/* <ThreeInARowBonusPhone /> */}
            <img src="/assets/images/landing/ThreeInARowBonusPhone.webp" alt="Three in a row bonus" />
          </div>
        </div>
        {/* Text */}
        <div className={styles['text-container']}>
          <h1>A NEW WAY TO PLAY</h1>

          <p className={styles['text']}>
            Introducing{' '}
            <span className={`${styles['gradient-text']} ${styles['text']}`}>
              Overboard Sports
            </span>
            : A contest based game where you can arrange picks in a 3x3 board
            and earn points
          </p>
        </div>
        {/*Download app button*/}
        <div className={styles['button-container']}>
          <Button
            size="md"
            onClick={() => {
              trackDownloadButton({
                page: location.pathname,
                location: 'new_way_to_play_section',
                buttonText: 'Download App',
              })
              const urlParams = new URLSearchParams(window.location.search)
              const referrer = urlParams.get('referrer')
              trackAppDownloadRedirect(referrer)
              navigate('/download')
            }}
            bg="linear-gradient(135deg, #F8AC1C, #E9663A)"
            color="#303083"
            hoverBg="linear-gradient(135deg, #E9663A, #F8AC1C)"
          >
            Download App
          </Button>
        </div>
      </div>
      {/* Right side */}
      <div className={styles['right-side']}
        style = {{
          marginBottom: '3rem',
        }}
      >
        <Features
          title="The Most Engaging DFS"
          features={newToPlayFeatures}
          cornerBlocks={{
            topLeft: true,
            topRight: true,
          }}
        />
      </div>
    
    </section>
  )
}

export default NewWayToPlay
