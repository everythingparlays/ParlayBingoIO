import React from 'react'
import styles from './PhoneFrame.module.css'

export type PhoneFrameSize = 'sm' | 'md' | 'lg'

export interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /**
   * Preset frame width: sm 220px, md 280px, lg 330px (capped at 100% of
   * the parent). Omit it to size the frame yourself via className; an
   * inline `style.width` always wins.
   */
  size?: PhoneFrameSize
  /** CSS aspect-ratio of the screen area (width / height). */
  screenAspect?: string
  /**
   * Reserve a black status-bar strip at the top of the screen so the
   * dynamic island never covers the screenshot's own UI. Turn off for
   * screens that already include their own status bar. Default true.
   */
  topInset?: boolean
}

/**
 * CSS-drawn iPhone 15-style device frame. Every measurement scales with
 * the frame's single width (a `size` preset, a className, or style.width).
 * Children (usually a <picture>/<img>) fill the screen, cropped from the top.
 */
export default function PhoneFrame({
  children,
  className,
  style,
  size,
  screenAspect = '1063 / 2301',
  topInset = true,
}: PhoneFrameProps) {
  return (
    <div
      className={[styles['root'], size ? styles[size] : '', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <div className={styles['device']}>
        <div className={styles['bezel']}>
          <div className={styles['screen']} style={{ aspectRatio: screenAspect }}>
            <div
              className={[styles['content'], topInset ? styles['safe-top'] : '']
                .filter(Boolean)
                .join(' ')}
            >
              {children}
            </div>
            <div className={styles['island']} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}
