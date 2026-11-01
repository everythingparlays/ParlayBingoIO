import React from 'react'
import LinearGradient from 'ui/LinearGradient'
import styles from './BusinessSection.module.css'

export type BusinessSectionTone = 'indigo' | 'dark' | 'textured'

export interface BusinessSectionProps {
  /** Section id (also the in-page anchor, e.g. "partners"). */
  id: string
  /**
   * Id of the section's visible heading (aria-labelledby). Defaults to
   * `${id}-heading`, so `<SectionHeading id={`${id}-heading`} ... />` just works.
   */
  labelledBy?: string
  /**
   * indigo = var(--primary); dark = #1D184C; textured = the hero's
   * heroBackgroundLeft.webp panel under an indigo wash. Default indigo.
   */
  tone?: BusinessSectionTone
  /** 4px crimson -> gold LinearGradient at the bottom edge, as on the home page. Default true. */
  separator?: boolean
  /** padding-block: var(--biz-section-y). Default true. */
  padded?: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

/**
 * Shared wrapper for every /business section below the hero: background
 * tone, vertical rhythm, the site's gradient separator, and a `.container`
 * for the content. Clips horizontal overflow so decorative art can bleed
 * without causing page scroll.
 */
export default function BusinessSection({
  id,
  labelledBy,
  tone = 'indigo',
  separator = true,
  padded = true,
  className,
  style,
  children,
}: BusinessSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? `${id}-heading`}
      className={[styles['section'], styles[tone], className].filter(Boolean).join(' ')}
      style={style}
    >
      <div
        className={['container', styles['inner'], padded ? styles['padded'] : '']
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
      {separator && <LinearGradient height="4px" className={styles['separator']} />}
    </section>
  )
}
