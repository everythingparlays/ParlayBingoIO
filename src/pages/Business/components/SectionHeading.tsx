import React from 'react'
import styles from './SectionHeading.module.css'

export interface SectionHeadingProps {
  /** Heading element id; pass the same value as BusinessSection's `labelledBy`. */
  id: string
  /** Main title, stored in natural case (uppercased in CSS). */
  title: string
  /** Optional trailing line in the site's orange gradient (as the hero's last line). */
  accent?: string
  /**
   * Optional supporting paragraph under the title. Usually a string; a node
   * also works (e.g. the lead followed by a <DraftNote />).
   */
  lead?: React.ReactNode
  align?: 'left' | 'center'
  /** md = the standard section title; xl = the larger closing title (final CTA). Default md. */
  size?: 'md' | 'xl'
  /** h1 only for a page's own title (e.g. /business/demo). */
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/**
 * Section title block for the /business page: the short crimson-to-gold
 * rule (the page's section marker), an uppercase Satoshi 900 title with an
 * optional gradient accent line, and an optional lead paragraph.
 * No eyebrow labels by design.
 *
 * @example
 * <SectionHeading id="partners-heading" title="Trusted by" accent="the teams fans love" />
 */
export default function SectionHeading({
  id,
  title,
  accent,
  lead,
  align = 'left',
  size = 'md',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={[styles['wrap'], styles[align], size === 'xl' ? styles['xl'] : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <Tag id={id} className={styles['title']}>
        <span className={styles['line']}>{title}</span>
        {accent && (
          <>
            {' '}
            <span className={`${styles['line']} ${styles['accent']}`}>{accent}</span>
          </>
        )}
      </Tag>
      {lead && <p className={styles['lead']}>{lead}</p>}
    </div>
  )
}
