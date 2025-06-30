import React from 'react'
import styles from '../styles/Social.module.css'
import Features from 'components/Features/Features'
import { socialData } from 'data/SocialData'
import Button from 'ui/Button'
import { useNavigate } from 'react-router-dom'
import Slideshow from 'components/Slideshow/Slideshow'

type Props = {}

function Social({}: Props) {
  const navigate = useNavigate()
  
  const socialImages = [
    '/assets/images/landing/social-slide-1.png',
    '/assets/images/landing/social-slide-2.png',
    '/assets/images/landing/social-slide-3.png'
  ]
  return (
    <section id={styles.section}>
      {/* Title */}
      <div className={styles['title-container']}>
        <h1 style={{ fontSize: '2rem' }}>
          <span className="gradient-text" style={{ fontSize: '2rem' }}>
            BE SOCIAL. MAKE FRIENDS.
          </span>{' '}
          HAVE FUN.
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
          />
        </div>
        {/* Right side */}
        <div className={styles['right-side']}>
          <Slideshow 
            images={socialImages}
            alt="Social feature"
            maxWidth="500px"
            minHeight="400px"
          />
        </div>
      </div>

      {/* Bottom button */}
      <div className={styles['button-container']}>
        <Button
          size="md"
          bg="var(--primary)"
          color="white"
          hoverBg="linear-gradient(135deg, #E9663A, #F8AC1C)"
          style={{ border: '1px solid' }}
          onClick={() => {
            navigate('/download')
          }}
        >
          Create a Free Board</Button>
      </div>
    </section>
  )
}

export default Social
