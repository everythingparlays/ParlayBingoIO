import React from 'react'
import styles from './BusinessHero.module.css'
import HeroIconTrophy from 'components/svg/HeroIconTrophy'
import HeroBlock from 'components/svg/HeroBlock'
import PhoneFrame from './PhoneFrame'
import BookDemoButton from './BookDemoButton'
import {
  ACTIVE_HEADLINE,
  HERO_CREDIBILITY,
  HERO_DESCRIPTION,
  HERO_EYEBROW_PRODUCT,
  HERO_EYEBROW_TAGLINE,
  HERO_HEADLINES,
} from '../businessConfig'

const IMG_BASE = '/assets/images/business'

// Dimensions from artifacts/business-page/export/manifest.json
const BOARD = { width: 1063, height: 2301 }
const PRIZE = { width: 870, height: 1015 }

// Stagger for the copy column's entrance (ms)
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default function BusinessHero() {
  const headline = HERO_HEADLINES[ACTIVE_HEADLINE]

  return (
    <section className={styles['hero']} aria-labelledby="business-hero-heading">
      <div className={styles['texture']} aria-hidden="true" />

      <div className={`container ${styles['inner']}`}>
        <div className={styles['copy']}>
          <p className={`${styles['eyebrow']} ${styles['reveal']}`} style={delay(0)}>
            <span className={styles['eyebrow-badge']}>
              <span className={styles['eyebrow-dot']} aria-hidden="true" />
              <span className={styles['eyebrow-product']}>{HERO_EYEBROW_PRODUCT}</span>
            </span>
            <span className={styles['eyebrow-divider']} aria-hidden="true" />
            <span className={styles['eyebrow-tagline']}>{HERO_EYEBROW_TAGLINE}</span>
          </p>

          <h1
            id="business-hero-heading"
            className={`${styles['headline']} ${styles['reveal']}`}
            style={delay(70)}
          >
            {headline.lines.map((line) => (
              <span key={line} className={styles['line']}>
                {line}{' '}
              </span>
            ))}
            <span className={`${styles['line']} ${styles['accent']}`}>
              {headline.accentLine}
            </span>
          </h1>

          <p className={`${styles['description']} ${styles['reveal']}`} style={delay(140)}>
            {HERO_DESCRIPTION}
          </p>

          <div className={`${styles['cta-row']} ${styles['reveal']}`} style={delay(210)}>
            <BookDemoButton location="hero" />
          </div>

          <p className={`${styles['credibility']} ${styles['reveal']}`} style={delay(280)}>
            {HERO_CREDIBILITY}
          </p>
        </div>

        <div className={styles['visual']}>
          <div className={styles['dots']} aria-hidden="true">
            <HeroBlock width="100%" height="100%" />
          </div>

          <div className={styles['phone']}>
            <PhoneFrame
              className={styles['phone-frame']}
              screenAspect={`${BOARD.width} / ${BOARD.height}`}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${IMG_BASE}/stadium-board-und-640.webp 640w, ${IMG_BASE}/stadium-board-und-1063.webp 1063w`}
                  sizes="(max-width: 768px) 60vw, 340px"
                />
                <img
                  src={`${IMG_BASE}/stadium-board-und-1063.jpg`}
                  width={BOARD.width}
                  height={BOARD.height}
                  alt="OBS Stadium Game board for North Dakota Fighting Hawks vs Omaha Mavericks showing three bingos and tiered Bronze, Silver and Gold prizes"
                  loading="eager"
                  decoding="async"
                  {...({ fetchpriority: 'high' } as Record<string, string>)}
                />
              </picture>
            </PhoneFrame>
          </div>

          <div className={styles['prize-float']}>
            <picture className={styles['prize']}>
              <source
                type="image/webp"
                srcSet={`${IMG_BASE}/prize-silver-und-560.webp 560w, ${IMG_BASE}/prize-silver-und.webp 870w`}
                sizes="(max-width: 768px) 52vw, 280px"
              />
              <img
                src={`${IMG_BASE}/prize-silver-und.png`}
                width={PRIZE.width}
                height={PRIZE.height}
                alt="Prize popup: Silver tier unlocked, 20% off Nike order"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>

          <div className={styles['trophy-bob']} aria-hidden="true">
            <div className={styles['trophy-pop']}>
              <HeroIconTrophy width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
