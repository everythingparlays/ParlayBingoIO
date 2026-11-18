import React, { useEffect, useState } from 'react'
import CashBag from 'components/svg/CashBag'
import Whistle from 'components/svg/Whistle'
import BusinessSection from '../../components/BusinessSection'
import SectionHeading from '../../components/SectionHeading'
import CtaRow from '../../components/CtaRow'
import Reveal from '../../components/Reveal'
import { CTA_VARIANTS } from '../../sectionsConfig'
import TargetSticker from './TargetSticker'
import { BENEFITS, BENEFITS_HEADING, FLIP_HINT, type Benefit, type BenefitIcon } from './content'
import styles from './Benefits.module.css'

const ID = 'benefits'
const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'

/** Tracks prefers-reduced-motion so the back face is never aria-hidden while it is on screen. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(REDUCE_QUERY)
    const update = () => setReduced(mql.matches)
    update()
    mql.addEventListener?.('change', update)
    return () => mql.removeEventListener?.('change', update)
  }, [])
  return reduced
}

function Icon({ icon }: { icon: BenefitIcon }) {
  if (icon === 'cash') return <CashBag width="88" height="88" />
  if (icon === 'whistle') return <Whistle width="88" height="88" />
  return <TargetSticker size={88} />
}

function FlipIcon() {
  return (
    <svg
      className={styles['hint-icon']}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13.5 6.5A5.5 5.5 0 0 0 3.2 4.6M2.5 9.5a5.5 5.5 0 0 0 10.3 1.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13.8 2.8v3.9H9.9M2.2 13.2V9.3h3.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface FlipCardProps {
  benefit: Benefit
  reducedMotion: boolean
}

/**
 * The whole card is one button. It flips on hover (fine pointers) and on
 * keyboard focus as a preview, and click / tap / Enter / Space toggle the
 * flipped state that aria-expanded reports. Turning a card back while it is
 * still hovered or focused suppresses the preview until the pointer or
 * focus leaves, so the toggle always has a visible effect.
 */
function FlipCard({ benefit, reducedMotion }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [suppressPreview, setSuppressPreview] = useState(false)
  const backId = `${ID}-${benefit.key}-detail`

  const toggle = () => {
    const next = !flipped
    setFlipped(next)
    setSuppressPreview(!next)
  }
  const release = () => setSuppressPreview(false)

  return (
    <li className={styles['item']}>
      <button
        type="button"
        className={[
          styles['card'],
          'biz-focus',
          flipped ? styles['flipped'] : '',
          suppressPreview ? styles['suppress'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-expanded={flipped}
        aria-controls={backId}
        onClick={toggle}
        onMouseLeave={release}
        onBlur={release}
      >
        <span className={styles['inner']}>
          <span className={`${styles['face']} ${styles['front']}`}>
            <span className={styles['icon']} aria-hidden="true">
              <Icon icon={benefit.icon} />
            </span>
            <span className={styles['front-copy']}>
              <span className={styles['title']}>{benefit.title}</span>
              <span className={styles['hint']} aria-hidden={flipped || undefined}>
                <FlipIcon />
                {/* one of the two is display:none per pointer type, so only the
                    visible wording is part of the button's accessible name */}
                <span className={`${styles['hint-text']} ${styles['hint-tap']}`}>{FLIP_HINT.tap}</span>
                <span className={`${styles['hint-text']} ${styles['hint-hover']}`}>{FLIP_HINT.hover}</span>
              </span>
            </span>
          </span>
          <span
            id={backId}
            className={`${styles['face']} ${styles['back']}`}
            aria-hidden={!flipped && !reducedMotion ? true : undefined}
          >
            <span className={styles['back-title']} aria-hidden="true">
              {benefit.title}
            </span>
            <span className={styles['body']}>{benefit.body}</span>
          </span>
        </span>
      </button>
    </li>
  )
}

/** US-04: three business outcomes as flip cards. No numbers in this section. */
export default function Benefits() {
  const reducedMotion = usePrefersReducedMotion()
  return (
    <BusinessSection id={ID} tone="dark">
      <SectionHeading
        id={`${ID}-heading`}
        title={BENEFITS_HEADING.title}
        accent={BENEFITS_HEADING.accent}
        lead={BENEFITS_HEADING.lead}
      />

      <Reveal as="ul" className={styles['grid']}>
        {BENEFITS.map((benefit) => (
          <FlipCard key={benefit.key} benefit={benefit} reducedMotion={reducedMotion} />
        ))}
      </Reveal>

      <CtaRow className={styles['cta']} label={CTA_VARIANTS.benefits} location={ID} />
    </BusinessSection>
  )
}
