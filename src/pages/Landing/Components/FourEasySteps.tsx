import React from 'react'
import styles from '../styles/FourEasySteps.module.css'
import Button from 'ui/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { trackDownloadButton, trackAppDownloadRedirect } from 'services/analytics'
import DashedLine from 'components/svg/DashedLine'
import { stepsToPlay } from 'data/StepsToPlay'
import Card from 'ui/Card/Card'
type Props = {}

function FourEasySteps({}: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <section id={styles.section}>
      {/*Titles and descriptions */}
      <div className={styles['container-top']}>
        <div className={styles['titles-container']}>
          <h1 className="gradient-text">4 EASY STEPS</h1>
          <h1 className="gradient-text">TO PLAY</h1>
          <div>
            <DashedLine height={4} />
          </div>
        </div>
        <div className={styles['container-top-right']}>
          <p style={{ color: 'white', fontSize: '1.25rem' }}>
            We give you a quick overview of how to play the game here, but you
            can see even more details below.
          </p>
          <div className={styles['buttons-container']}>
            <Button
              size="md"
              onClick={() => {
                trackDownloadButton({
                  page: location.pathname,
                  location: 'how_to_play_section',
                  buttonText: 'Get Started',
                })
                const urlParams = new URLSearchParams(window.location.search)
                const referrer = urlParams.get('referrer')
                trackAppDownloadRedirect(referrer)
                navigate('/download')
              }}
              bg="var(--secondary-cta)"
              color="var(--primary)"
              hoverBg="var(--secondary-cta)"
            >
              Get Started
            </Button>
            <Button
              size="md"
              bg="var(--primary)"
              color="white"
              hoverBg="linear-gradient(135deg, #E9663A, #F8AC1C)"
              style={{ border: '1px solid' }}
              onClick={() => {
                trackDownloadButton({
                  page: location.pathname,
                  location: 'how_to_play_section',
                  buttonText: 'Create a Free Board',
                })
                const urlParams = new URLSearchParams(window.location.search)
                const referrer = urlParams.get('referrer')
                trackAppDownloadRedirect(referrer)
                navigate('/download')
              }}
            >
              Create a Free Board
            </Button>
          </div>
        </div>
      </div>
      {/*Steps Content */}
      <div className={styles['content-container']}>
        {stepsToPlay.map((step) => (
          <Card key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}

export default FourEasySteps;
