import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './Reveal.module.css'

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Extra wait before the fade starts, in ms (for light staggering). Default 0. */
  delay?: number
  /** Element to render. Default "div". */
  as?: keyof JSX.IntrinsicElements
  className?: string
  children?: React.ReactNode
}

type Phase = 'idle' | 'armed' | 'shown'

/**
 * Scroll-reveal wrapper (use sparingly: one per section block, not per
 * item). Fades content up 14px over 600ms once 15% of it is on screen.
 * Content is fully visible on the server, before hydration, under
 * prefers-reduced-motion, and where IntersectionObserver is missing: it is
 * only hidden after the client has confirmed it can reveal it again.
 */
export default function Reveal({
  delay = 0,
  as = 'div',
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')

  // Arm before first paint so in-view content never flashes hidden.
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    setPhase('armed')
  }, [])

  useEffect(() => {
    const el = ref.current
    if (phase !== 'armed' || !el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // 15% visible, or (for blocks taller than the viewport) a quarter
          // of the viewport filled by it
          const enough =
            entry.intersectionRatio >= 0.15 ||
            entry.intersectionRect.height >= window.innerHeight * 0.25
          if (entry.isIntersecting && enough) {
            setPhase('shown')
            observer.disconnect()
          }
        }
      },
      { threshold: [0, 0.05, 0.1, 0.15] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [phase])

  const Tag = as as React.ElementType
  return (
    <Tag
      {...rest}
      ref={ref}
      className={[
        phase !== 'idle' ? styles['armed'] : '',
        phase === 'shown' ? styles['shown'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ') || undefined}
      style={
        delay
          ? ({ ...style, '--reveal-delay': `${delay}ms` } as React.CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  )
}
