import React, { useState, useEffect } from 'react'
import styles from '../styles.module.css'
import HeroIconTrophy from 'components/svg/HeroIconTrophy'
import GooglePlayDownload from 'components/svg/GooglePlayDownload'
import AppleDownload from 'components/svg/AppleDownload'
import LinearGradient from 'ui/LinearGradient'
import SecondaryPhoneHero from 'components/svg/SecondaryPhoneHero'
import HeroBlock from 'components/svg/HeroBlock'
import DashedLine from 'components/svg/DashedLine'
import {
  trackDownloadButton,
  trackAppDownloadRedirect,
} from 'services/analytics'

{
  /*
  Hero section CSS is in the styles/Hero.module.css file
*/
}

function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 480)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <section id={styles['hero']}>
      <div id={styles['hero-inner']}>
        <div className={styles['hero-left']}>
          <div className={styles['hero-left-inner']}>
            <div className={styles['hero-titles']}>
              <div>
                <h1 className={styles['hero-title']}>MAKE EVERY GAME</h1>
              </div>
              <div>
                <h1 className={`${styles['hero-title2']} gradient-text`}>
                  A GREAT GAME
                </h1>
              </div>
            </div>

            <div className={styles['hero-cta-container']}>
              <DashedLine />
              <div>
                <h2
                  style={{
                    fontSize: 30,
                    color: 'white',
                    fontFamily: 'var(--font-main)',
                    fontWeight: 700,
                  }}
                >
                  100% Free to play
                </h2>
              </div>
              <DashedLine />
            </div>

            <div className={styles['app-store-buttons']}>
              <a
                href="https://apps.apple.com/us/app/parlay-bingo/id1665470403"
                target="_blank"
                onClick={() => {
                  trackDownloadButton({
                    page: '/',
                    location: 'hero_section',
                    buttonText: 'Apple App Store',
                  })
                  const urlParams = new URLSearchParams(window.location.search)
                  const referrer = urlParams.get('referrer')
                  trackAppDownloadRedirect(referrer)
                }}
                aria-label="Apple App Store Button"
                className={styles['app-store-button']}
              >
                {/* HERO BUTTON SIZE CONTROL: Change these width/height values to adjust hero app store button sizes */}
                <AppleDownload
                  width={isMobile ? 120 : 200}
                  height={isMobile ? 36 : 60}
                />
              </a>
              <a
                href="https://docs.google.com/forms/d/1Rxwi9b8uKDTDZ2JcKnUrWLbTItRA6WZHWnE77X57kd0/viewform?edit_requested=true"
                target="_blank"
                onClick={() => {
                  trackDownloadButton({
                    page: '/',
                    location: 'hero_section',
                    buttonText: 'Google Play Store',
                  })
                  const urlParams = new URLSearchParams(window.location.search)
                  const referrer = urlParams.get('referrer')
                  trackAppDownloadRedirect(referrer)
                }}
                className={styles['app-store-button']}
                aria-label="Google Play Store Button"
              >
                {/* HERO BUTTON SIZE CONTROL: Change these width/height values to adjust hero app store button sizes */}
                <GooglePlayDownload
                  width={isMobile ? 120 : 200}
                  height={isMobile ? 36 : 60}
                />
              </a>
            </div>
          </div>
        </div>
        {/* right side of the hero */}
        <div className={styles['hero-right']}>
          <div
            className={styles['phone-mockup-container']}
            style={{ position: 'relative', overflow: 'visible' }}
          >
            <div className={styles['hero-blocks']}>
              <HeroBlock />
            </div>
            {/* Trophy icon - z-index: 4 */}
            <div className={styles['trophy-icon']}>
              <HeroIconTrophy />
            </div>

            {/* Background element - z-index: 1 */}
            <div
              className={styles['background-square']}
              style={{ left: '-20%', top: '60%', opacity: 0.7 }}
            >
              <img
                src="/assets/images/landing/hero-right-square.png"
                {...({ fetchpriority: 'high' } as any)}
                alt="Background Element"
              />
            </div>

            {/* Primary phone SVG - z-index: 3 */}
            <div
              style={{
                position: 'absolute',
                width: '220%',
                height: 'auto',
                left: '-75%',
                transform: 'rotate(-5deg)',
                zIndex: 3,
              }}
              className={styles['phone-primary']}
            >
              <img
                src="/assets/images/landing/PrimaryPhoneHero3x.png"
                alt="Primary Phone"
                loading="eager"
                {...({ fetchpriority: 'high' } as any)}
                decoding="async"
              />
            </div>

            {/* Secondary phone SVG - z-index: 2 */}
            <div
              style={{
                position: 'absolute',
                width: '200%',
                height: 'auto',
                left: '-20%',
                transform: 'rotate(-6deg)',
                zIndex: 2,
              }}
              className={styles['phone-secondary']}
            >
              <img
                src="/assets/images/landing/SecondaryPhoneHero.webp"
                alt="Secondary Phone"
              />
            </div>
          </div>
        </div>
      </div>
      <LinearGradient
        height="4px"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 5,
        }}
      />
    </section>
  )
}

export default Hero
