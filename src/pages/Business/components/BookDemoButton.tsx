import React from 'react'
import buttonStyles from 'ui/styles/Button.module.css'
import type { ButtonSize } from 'ui/Button'
import { trackBusinessCta } from 'services/analytics'
import styles from './BookDemoButton.module.css'
import {
  CTA_LABEL_PRIMARY,
  getBookDemoHref,
  isBookDemoPlaceholder,
} from '../businessConfig'

export interface BookDemoButtonProps {
  /** Where on the page this CTA lives (e.g. "hero"); written to data-cta-location. */
  location: string
  /** Button copy. Defaults to CTA_LABEL_PRIMARY; sections pass a CTA_VARIANTS entry. */
  label?: string
  size?: ButtonSize
  /** Stretch to the full row width on small screens (<= 480px). */
  fullWidthOnMobile?: boolean
  /**
   * Show the "[PLACEHOLDER] Booking link pending" note while BOOK_DEMO_URL is
   * null. Only the hero sets this, so the note appears once per page.
   */
  showPlaceholderNote?: boolean
  className?: string
}

// Same visual treatment as the site's primary gradient <Button>
// (see pages/Landing/Components/NewWayToPlay.tsx), applied to an anchor.
const GRADIENT_STYLE = {
  background: 'linear-gradient(135deg, #F8AC1C, #E9663A)',
  color: '#303083',
  '--hover-bg': 'linear-gradient(135deg, #E9663A, #F8AC1C)',
  '--hover-color': '#303083',
} as React.CSSProperties & { '--hover-bg': string; '--hover-color': string }

/**
 * "Book a Personalized Demo" call to action. Always routes through
 * getBookDemoHref(): the OBS calendar link once BOOK_DEMO_URL is set,
 * otherwise an email to OBS support. While the link is pending, the CTA
 * that sets `showPlaceholderNote` (the hero) shows a visible placeholder note.
 */
export default function BookDemoButton({
  location,
  label = CTA_LABEL_PRIMARY,
  size = 'lg',
  fullWidthOnMobile = true,
  showPlaceholderNote = false,
  className,
}: BookDemoButtonProps) {
  const href = getBookDemoHref()
  const isExternal = /^https?:\/\//i.test(href)
  const placeholder = showPlaceholderNote && isBookDemoPlaceholder()

  return (
    <div
      className={[styles['wrap'], fullWidthOnMobile ? styles['full'] : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <a
        href={href}
        className={[buttonStyles.button, buttonStyles[size], styles['cta']].join(' ')}
        style={GRADIENT_STYLE}
        data-cta="book-demo"
        data-cta-location={location}
        // fire-and-forget: never preventDefault, the link navigates as usual
        onClick={() => trackBusinessCta({ location, label, href })}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label}
      </a>
      {placeholder && (
        <span className={styles['note']}>
          [PLACEHOLDER] Booking link pending — opens an email to OBS for now.
        </span>
      )}
    </div>
  )
}
