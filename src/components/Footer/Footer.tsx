import styles from './styles.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { scrollToSection } from 'utils/scroll'
import {
  trackDownloadButton,
  trackAppDownloadRedirect,
  trackNavigation,
  trackSectionView,
} from 'services/analytics'
import QrCode from '../svg/QrCode'
import AppleDownload from '../svg/AppleDownload'
import GooglePlayDownload from '../svg/GooglePlayDownload'
import React, { useState, useEffect } from 'react'
import LineColumns from 'components/svg/LineColumns'
import DashedLine from 'components/svg/DashedLine'
import SportsBall from 'components/svg/SportsBall'
import LinearGradient from '../../ui/LinearGradient'
import FooterLogo from 'components/svg/FooterLogo'
import Facebook from 'components/svg/Facebook'
import Instagram from 'components/svg/Instagram'
import X_twitter from 'components/svg/X_twitter'
import Button from 'ui/Button'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 480)
    }
    console.log(window.innerWidth)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    console.log(isMobile)
  }, [isMobile])
  return (
    <footer id={styles['footer']} data-section="contact">
      {/* Left */}
      <div className={styles['left-container']}>
        <div className={styles['left-container-content']}>
          <div className={styles['title-container']}>
            <DashedLine />
            <h3>100% Free to Play</h3>
            <DashedLine />
          </div>
          <div className={styles['download-to-container']}>
            <h3>DOWNLOAD TO</h3>
          </div>
          <div>
            <LineColumns />
            <h1>WIN</h1>
            <LineColumns />
          </div>
          <div>
            <a
              href="/download"
              onClick={() => {
                trackDownloadButton({
                  page: location.pathname,
                  location: 'footer',
                  buttonText: 'Apple App Store',
                })
                const urlParams = new URLSearchParams(window.location.search)
                const referrer = urlParams.get('referrer')
                trackAppDownloadRedirect(referrer)
              }}
              className={styles['download-svg-container']}
              aria-label="Apple App Store Button"
            >
              <AppleDownload />
            </a>
            <a
              href="/download"
              onClick={() => {
                trackDownloadButton({
                  page: location.pathname,
                  location: 'footer',
                  buttonText: 'Google Play Store',
                })
                const urlParams = new URLSearchParams(window.location.search)
                const referrer = urlParams.get('referrer')
                trackAppDownloadRedirect(referrer)
              }}
              className={styles['download-svg-container']}
              aria-label="Google Play Store Button"
            >
              <GooglePlayDownload />
            </a>
          </div>
          <div className={styles['qr-code-container']}>
            <QrCode />
          </div>
        </div>
        <div className={styles['left-container-decorations']}>
          <SportsBall />
        </div>
      </div>
      {/* Right*/}
      <div className={styles['right-container']}>
        <div className={styles['footer-right-container-content']}>
          <div className={styles['footer-logo-container']}>
            <FooterLogo width="291px" height="252px" />
          </div>
          <div className={styles['footer-break-container']}></div>
          <div className={styles['footer-links-container']}>
            {isMobile ? (
              // Mobile layout: Our Game section first, then Social section
              <>
                <div className={styles['footer-our-game-section']}>
                  <h3>Our game</h3>
                  <p
                    onClick={() => {
                      if (location.pathname !== '/') {
                        trackNavigation({
                          from: location.pathname,
                          to: '/how-to-play',
                          method: 'click',
                        })
                        navigate('/')
                        setTimeout(() => scrollToSection('how-to-play'), 100)
                        trackSectionView('how-to-play', location.pathname)
                      } else {
                        trackNavigation({
                          from: location.pathname,
                          to: '/how-to-play',
                          method: 'scroll',
                        })
                        scrollToSection('how-to-play')
                        trackSectionView('how-to-play', location.pathname)
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    How to play
                  </p>
                  <p>The Team</p>
                  <a
                    href="/help-center"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <p>Contact</p>
                  </a>
                  <p>Support</p>
                </div>
                <div className={styles['footer-social-section']}>
                  <h3>Social</h3>
                  <div className={styles['footer-social-container']}>
                    <a
                      href="https://www.facebook.com/people/OverBoard-Sports/61567589822869/"
                      target="_blank"
                      style={{ cursor: 'pointer' }}
                      aria-label="Facebook"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="https://www.instagram.com/overboardsports/"
                      target="_blank"
                      style={{ cursor: 'pointer' }}
                      aria-label="Instagram"
                    >
                      <Instagram />
                    </a>
                    <a
                      href="https://x.com/overboardsport"
                      target="_blank"
                      style={{ cursor: 'pointer' }}
                      aria-label="X"
                    >
                      <X_twitter />
                    </a>
                  </div>
                  <Button
                    disabled={true}
                    hoverBg="#ffffff"
                    style={{
                      backgroundColor: '#ffffff',
                      color: 'var(--primary)',
                      borderRadius: 'var(--size-1)',
                      opacity: 1, // Add this line
                    }}
                  >
                    Join the Discord
                  </Button>
                </div>
                <div className={styles['footer-support-text']}>
                  <p>Available in All 50 States for Free-to-Play Contests</p>
                </div>
              </>
            ) : (
              // Desktop layout: Keep original structure
              <>
                <div
                  className={`${styles['footer-our-game-container']} ${styles['links-row']}`}
                >
                  <h3>Our game</h3>
                  <h3>Social</h3>
                </div>
                <div
                  className={`${styles['footer-how-to-play-container']} ${styles['links-row']}`}
                >
                  <p
                    onClick={() => {
                      if (location.pathname !== '/') {
                        trackNavigation({
                          from: location.pathname,
                          to: '/how-to-play',
                          method: 'click',
                        })
                        navigate('/')
                        setTimeout(() => scrollToSection('how-to-play'), 100)
                        trackSectionView('how-to-play', location.pathname)
                      } else {
                        trackNavigation({
                          from: location.pathname,
                          to: '/how-to-play',
                          method: 'scroll',
                        })
                        scrollToSection('how-to-play')
                        trackSectionView('how-to-play', location.pathname)
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    How to play
                  </p>
                  <div className={styles['footer-social-container']}>
                    <a
                      href="https://www.facebook.com/people/OverBoard-Sports/61567589822869/"
                      target="_blank"
                      style={{ cursor: 'pointer' }}
                      aria-label="Facebook"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="https://www.instagram.com/overboardsports/"
                      target="_blank"
                      style={{ cursor: 'pointer' }}
                      aria-label="Instagram"
                    >
                      <Instagram />
                    </a>
                    <a
                      href="https://x.com/overboardsport"
                      target="_blank"
                      style={{ cursor: 'pointer' }}
                      aria-label="X"
                    >
                      <X_twitter />
                    </a>
                  </div>
                </div>
                <div
                  className={`${styles['footer-the-team-container']} ${styles['links-row']}`}
                >
                  <p>The Team</p>
                  <Button
                    disabled={true}
                    hoverBg="#ffffff"
                    style={{
                      backgroundColor: 'var(--white)',
                      color: 'var(--primary)',
                      borderRadius: 'var(--size-1)',
                    }}
                  >
                    Join the Discord
                  </Button>
                </div>
                <div
                  className={`${styles['footer-contact-container']} ${styles['links-row']}`}
                >
                  <a
                    href="/help-center"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <p>Contact</p>
                  </a>
                  {!isMobile && <div></div>} {/* Only render on desktop */}
                </div>
                <div
                  className={`${styles['footer-support-container']} ${styles['links-row']}`}
                >
                  <p>Support</p>
                  <div>
                    <p>Available in All 50 States for Free-to-Play Contests</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles['footer-bottom-container']}>
            <div className={styles['footer-copyright-container']}>
              <p>© 2025 Overboard Sports. All rights reserved.</p>
            </div>
            <div className={styles['footer-terms-container']}>
              <a
                aria-label="Terms of Service"
                href="https://www.everythingparlays.com/terms-of-service"
                target="_blank"
              >
                Terms of Service
              </a>
              <span>|</span>
              <a
                aria-label="Privacy Policy"
                href="https://www.everythingparlays.com/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <LinearGradient
        style={{
          height: '12px',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
        className={styles['footer-gradient']}
      />
    </footer>
  )
}
