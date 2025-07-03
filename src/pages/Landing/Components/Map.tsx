import React, { useState } from 'react'
import styles from '../styles/Map.module.css'
import FreeToPlaySticker from 'components/svg/FreeToPlaySticker'
import LeftNewToPlayBlocks from 'components/svg/LeftNewToPlayBlocks'
import RightNewToPlayBlocks from 'components/svg/RightNewToPlayBlocks'
import MapPin from 'components/svg/MapPin'
import Button from 'ui/Button'

type Props = {}

const Map = ({}: Props) => {
  const [activeTab, setActiveTab] = useState('free') // 'free' or 'paid'

  return (
    <section className={styles['map-section']}>
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
              onClick={() => setActiveTab('free')}
            >
              <span>Free-to-Play</span>
            </div>
            <div
              className={
                activeTab === 'paid'
                  ? styles['contest-tab-active']
                  : styles['contest-tab']
              }
              onClick={() => setActiveTab('paid')}
            >
              <span>Paid Contests</span>
            </div>
          </div>
        </div>

        <div>
          <p className={`${styles['map-subtitle']} gradient-text`}>
            Available in All 50 States for Free-to-Play Contests
          </p>
        </div>

        <div className={styles['map-visual']}>
          <div className={styles['map-usa-container']}>
            <img
              src="/assets/images/landing/Map.png"
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
          <h3>
            {activeTab === 'free'
              ? 'Free to play anywhere, get in on the fun'
              : 'Paid contests available in select states'}
          </h3>
          <Button
            className={styles['download-app-button']}
            style={{
              backgroundColor: '#d9eefb',
              color: 'var(--primary)',
            }}
          >
            Download the App
          </Button>
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
