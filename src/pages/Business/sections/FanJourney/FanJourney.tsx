import React, { useEffect, useState } from 'react'
import BusinessSection from '../../components/BusinessSection'
import SectionHeading from '../../components/SectionHeading'
import CtaRow from '../../components/CtaRow'
import Reveal from '../../components/Reveal'
import PhoneFrame from '../../components/PhoneFrame'
import ScreenCapture from '../../components/ScreenCapture'
import { CTA_VARIANTS } from '../../sectionsConfig'
import {
  JOURNEY_ACCENT,
  JOURNEY_LEAD,
  JOURNEY_STEPS,
  JOURNEY_TITLE,
} from './content'
import styles from './FanJourney.module.css'

/** Below this width the steps become a horizontal scroll-snap row. */
const SCROLLER_QUERY = '(max-width: 767px)'

/**
 * PhoneFrame's status-bar inset is 12% of the frame width and the screen is
 * 91% of it, so the screen is the 378x734 capture plus that strip: the
 * capture fills it with nothing cropped at the bottom. One ratio for all
 * three phones (the 376px prize capture loses 1px a side) keeps the frames,
 * and the numeral row under them, exactly level.
 */
const SCREEN_ASPECT = `378 / ${Math.round(734 + (378 * 12) / 91)}`

/** True while the steps render as the phone-width scroll row. */
function useIsScroller(): boolean {
  const [match, setMatch] = useState(
    () =>
      typeof window !== 'undefined' &&
      !!window.matchMedia?.(SCROLLER_QUERY).matches
  )
  useEffect(() => {
    const mql = window.matchMedia?.(SCROLLER_QUERY)
    if (!mql) return
    const onChange = () => setMatch(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return match
}

/**
 * A focused card that only peeks into view would keep its focus ring off
 * screen: snap it fully into the row (the row scrolls, the page doesn't).
 */
function revealFocusedCard(e: React.FocusEvent<HTMLLIElement>) {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  e.currentTarget.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'nearest',
    inline: 'start',
  })
}

/**
 * US-05: the three-step fan journey on real Minnesota Wild x Cub screens.
 * Desktop/tablet: three columns joined by a dashed connector. Phone: a
 * horizontal scroll-snap row of cards (each a Tab stop there, scrolled into
 * the row on focus) that never scrolls the page sideways.
 */
export default function FanJourney() {
  const isScroller = useIsScroller()

  return (
    <BusinessSection id="journey" tone="indigo">
      <div className={styles['layout']}>
        <SectionHeading
          id="journey-heading"
          title={JOURNEY_TITLE}
          accent={JOURNEY_ACCENT}
          lead={JOURNEY_LEAD}
        />

        <Reveal>
          <ol className={styles['steps']}>
            {JOURNEY_STEPS.map((step, i) => (
              <li
                key={step.label}
                className={`${styles['step']} biz-focus`}
                tabIndex={isScroller ? 0 : undefined}
                onFocus={isScroller ? revealFocusedCard : undefined}
              >
                <div className={styles['device']}>
                  <PhoneFrame
                    className={styles['phone']}
                    screenAspect={SCREEN_ASPECT}
                  >
                    <ScreenCapture
                      src={step.src}
                      src2x={step.src2x}
                      width={step.width}
                      height={step.height}
                      alt={step.alt}
                    />
                  </PhoneFrame>
                </div>

                <div className={styles['marker']} aria-hidden="true">
                  <span className={styles['num']}>{i + 1}</span>
                </div>

                <h3 className={styles['label']}>{step.label}</h3>
                <p className={styles['caption']}>{step.caption}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <CtaRow label={CTA_VARIANTS.journey} location="journey" />
      </div>
    </BusinessSection>
  )
}
