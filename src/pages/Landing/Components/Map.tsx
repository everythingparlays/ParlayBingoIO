import React, { useState } from 'react'
import styles from '../styles/Map.module.css'
import FreeToPlaySticker from 'components/svg/FreeToPlaySticker'
import LeftNewToPlayBlocks from 'components/svg/LeftNewToPlayBlocks'
import RightNewToPlayBlocks from 'components/svg/RightNewToPlayBlocks'
import MapPin from 'components/svg/MapPin'
import Button from 'ui/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { trackDownloadButton, trackAppDownloadRedirect } from 'services/analytics'
import { analytics } from 'App'

type Props = {}

const Map = ({}: Props) => {
  const [activeTab, setActiveTab] = useState('free') // 'free' or 'paid'
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section id="where-to-play" className={styles['map-section']}>
      <div className={styles['map-pin-container']}>
        <MapPin width={46} height={57} />
      </div>
      <div className={styles['map-content']}>
        <div className={styles['map-header']}>
          <h2 className={`${styles['map-title']} gradient-text`}>
            WHERE YOU CAN PLAY
          </h2>
          <div className={styles['contest-tabs']}>
            <div
              className={
                activeTab === 'free'
                  ? styles['contest-tab-active']
                  : styles['contest-tab']
              }
              onClick={() => {
                setActiveTab('free')
                analytics.track('map_tab_clicked', {
                  tab: 'free',
                  page: location.pathname,
                  timestamp: new Date().toISOString(),
                })
              }}
            >
              <span>Free-to-Play</span>
            </div>
            <div
              className={
                activeTab === 'paid'
                  ? styles['contest-tab-active']
                  : styles['contest-tab']
              }
              onClick={() => {
                setActiveTab('paid')
                analytics.track('map_tab_clicked', {
                  tab: 'paid',
                  page: location.pathname,
                  timestamp: new Date().toISOString(),
                })
              }}
            >
              <span>Paid Contests</span>
            </div>
          </div>
        </div>

        <div className = {styles['map-subtitle-container']}>
          <p className={`${styles['map-subtitle']} gradient-text`}>
            Available in All 50 States for Free-to-Play Contests
          </p>
        </div>

        <div className={styles['map-visual']}>
          <div className={styles['map-usa-container']}>
            <img
              src={activeTab === 'paid' ? "/assets/images/landing/MapComingSoon.png" : "/assets/images/landing/Map.png"}
              alt="US Map"
              className={styles['map-usa']}
          />
            <div className={styles['overboard-word-container']}>
              <div className={styles['overboard-word']}>
                <img
                  src="/assets/images/landing/overboardword.png"
                  alt="Overboard"
                />
              </div>
            </div>
          </div>

          <div className={styles['dots-pattern']}></div>
        </div>

        <div className={styles['map-footer']}>
          <Button
            className={styles['download-app-button']}
            onClick={() => {
              trackDownloadButton({
                page: location.pathname,
                location: 'map_section',
                buttonText: 'Download the App',
                source: `map_${activeTab}_tab`,
              })
              const urlParams = new URLSearchParams(window.location.search)
              const referrer = urlParams.get('referrer')
              trackAppDownloadRedirect(referrer)
              navigate('/download')
            }}
            style={{
              backgroundColor: '#d9eefb',
              color: 'var(--primary)',
            }}
            hoverBg="#d9eefb"
            hoverColor="var(--primary)"
          >
            Download the App
          </Button>
          <h3 className={styles['map-footer-subtitle']}>
            {activeTab === 'free'
              ? 'Free to play anywhere, get in on the fun'
              : 'Paid contests available in select states'}
          </h3>
        </div>

        {/* Bottom-right decorative section */}
        <div className={styles['bottom-right-decorative']}>
          {/* Top-right dot pattern */}
          <div className={styles['top-right-dots']}>
            <RightNewToPlayBlocks width="163" height="113" />
          </div>

          {/* Bottom-left dot pattern */}
          <div className={styles['bottom-left-dots']}>
            <LeftNewToPlayBlocks width="163" height="113" />
          </div>

          {/* Main sticker */}
          <div className={styles['main-sticker']}>
            <FreeToPlaySticker width={353} height={311} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Map
