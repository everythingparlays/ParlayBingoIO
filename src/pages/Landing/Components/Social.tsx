import React from 'react'
import styles from '../styles/Social.module.css'
import Features from 'components/Features/Features'
import { socialData } from 'data/SocialData'
import Button from 'ui/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  trackDownloadButton,
  trackAppDownloadRedirect,
} from 'services/analytics'
import Slideshow from 'components/Slideshow/Slideshow'

type Props = {}

function Social({}: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  const socialImages = [
    '/assets/images/landing/social-slide-1-hq.webp',
    '/assets/images/landing/social-slide-2-hq.webp',
    '/assets/images/landing/social-slide-3-hq.webp',
  ]
  return (
    <section id={styles.section}>
      {/* Title */}
      <div className={styles['title-container']}>
        <h1
          className={`gradient-text ${styles['title-text']}`}
          style={{ fontSize: '2rem' }}
        >
          <span className={styles['title-line']} style={{ fontSize: '2rem' }}>
            BE SOCIAL. 
          </span>
          <span className={styles['title-line']} style={{ fontSize: '2rem' }}>
            MAKE FRIENDS.
          </span>
          <span className={styles['title-line']} style={{ fontSize: '2rem' }}>
            HAVE FUN.
          </span>
        </h1>
      </div>
      {/* Content */}
      <div className={styles['content-container']}>
        {/* Left side */}
        <div className={styles['left-side']}>
          <Features
            cornerBlocks={{
              topLeft: true,
              bottomRight: true,
            }}
            features={socialData}
            dashedLine={false}
          />
        </div>
        {/* Right side */}
        <div className={styles['right-side']}>
          <Slideshow
            images={socialImages}
            alt="Social feature"
            maxWidth="500px"
            autoSlide={true}
            slideInterval={4000}
            // minHeight="300px"
          />
        </div>
      </div>

      {/* Bottom button */}
      <div className={styles['button-container']}>
        <Button
          size="lg"
          bg="var(--primary)"
          color="white"
          hoverBg="linear-gradient(135deg, #E9663A, #F8AC1C)"
          style={{ border: '1px solid' }}
          onClick={() => {
            trackDownloadButton({
              page: location.pathname,
              location: 'social_section',
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
    </section>
  )
}

export default Social
