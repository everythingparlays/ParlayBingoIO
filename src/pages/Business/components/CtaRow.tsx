import React from 'react'
import BookDemoButton from './BookDemoButton'
import styles from './CtaRow.module.css'

export interface CtaRowProps {
  /** Button copy; use the section's entry from CTA_VARIANTS (sectionsConfig.ts). */
  label: string
  /** Section key written to data-cta-location (e.g. "partners"). */
  location: string
  /** Short expectation-setting line beside the button (below it when space runs out). */
  note?: string
  align?: 'left' | 'center'
  size?: 'md' | 'lg'
  className?: string
}

/**
 * End-of-section call to action: the "Book a demo" button (always routed
 * through getBookDemoHref) plus an optional note. Lower sections never show
 * the booking-link placeholder note; only the hero does.
 */
export default function CtaRow({
  label,
  location,
  note,
  align = 'left',
  size = 'lg',
  className,
}: CtaRowProps) {
  return (
    <div className={[styles['row'], styles[align], className].filter(Boolean).join(' ')}>
      <BookDemoButton label={label} location={location} size={size} />
      {note && <p className={styles['note']}>{note}</p>}
    </div>
  )
}
