import React from 'react'
import styles from '../styles.module.css'
import HeroIconTrophy from 'components/svg/HeroIconTrophy'
import GooglePlayDownload from 'components/svg/GooglePlayDownload'
import AppleDownload from 'components/svg/AppleDownload'
import LinearGradient from 'ui/LinearGradient'
import PrimaryPhoneHero from 'components/svg/PrimaryPhoneHero'
import SecondaryPhoneHero from 'components/svg/SecondaryPhoneHero'
import HeroBlock from 'components/svg/HeroBlock'
function Hero() {
  return (
    <section id={styles['hero']}>
      <div id={styles['hero-inner']}>
        <div className={styles['hero-left']}>
          <div className={styles['hero-left-inner']}>
            <div className={styles['hero-titles']}>
              <div>
                <h1>MAKE EVERY GAME</h1>
              </div>
              <div>
                <h1 className="gradient-text">A GREAT GAME</h1>
              </div>
            </div>

            <div className={styles['hero-cta-container']}>
              <div className={styles['hero-divider']}></div>
              <div>
                <h4 style={{ fontSize: 30, color: 'white' }}>
                  100% Free to play
                </h4>
              </div>
              <div className={styles['hero-divider']}></div>
            </div>

            <div className={styles['app-store-buttons']}>
              <a href="/download">
                <AppleDownload width={200} height={75} />
              </a>
              <a href="/download">
                <GooglePlayDownload width={200} height={75} />
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
            <div className={styles['hero-blocks']} style={{}}>
              <HeroBlock width={300} />
            </div>
            {/* Trophy icon - z-index: 4 */}
            <div className={styles['trophy-icon']}>
              <HeroIconTrophy />
            </div>

            {/* Background element - z-index: 1 */}
            <div
              className={styles['background-square']}
              style={{ left: '-20%', top: '70%', opacity: 0.7 }}
            >
              <img
                src="/assets/images/landing/hero-right-square.png"
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
                top: '0%',
                transform: 'rotate(-5deg)',
                zIndex: 3,
              }}
            >
              <PrimaryPhoneHero />
            </div>

            {/* Secondary phone SVG - z-index: 2 */}
            <div
              style={{
                position: 'absolute',
                width: '200%',
                height: 'auto',
                left: '-20%',
                top: '10%',
                transform: 'rotate(-6deg)',
                zIndex: 2,
              }}
            >
              <SecondaryPhoneHero />
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
