import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NOTIFY, NOTIFY_CAPTION, NOTIFY_CHIP } from './content'
import styles from './EmailNotification.module.css'

type Phase = 'idle' | 'armed' | 'shown'

/** Generic envelope on the brand gradient. Deliberately not any mail app's icon. */
function EnvelopeIcon() {
  return (
    <span className={styles['icon']} aria-hidden="true">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        focusable="false"
      >
        <rect
          x="2.5"
          y="4.5"
          width="15"
          height="11"
          rx="2"
          stroke="#1d184c"
          strokeWidth="1.7"
        />
        <path
          d="M3.2 5.6l6.8 5.1 6.8-5.1"
          stroke="#1d184c"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export interface EmailNotificationProps {
  className?: string
}

/**
 * Illustrative phone notification that "pops up" beside the fan card: a team
 * email built from the example fan's favorite player. Real text, no phone
 * frame.
 *
 * Motion follows Reveal's contract: the card is visible on the server,
 * before hydration, under prefers-reduced-motion and without
 * IntersectionObserver. It is only hidden once the client can bring it back,
 * then drops in when 40% of it is on screen. It always occupies its layout
 * box, so the entrance never shifts anything.
 */
export default function EmailNotification({
  className,
}: EmailNotificationProps) {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')

  // Arm before first paint so an in-view card never flashes hidden.
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
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase('shown')
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [phase])

  return (
    <figure
      ref={ref}
      className={[
        styles['notify'],
        phase !== 'idle' ? styles['armed'] : '',
        phase === 'shown' ? styles['shown'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <figcaption className="biz-sr-only">{NOTIFY_CAPTION}</figcaption>
      <div className={styles['card']}>
        <span className={styles['chip']} aria-hidden="true">
          {NOTIFY_CHIP}
        </span>
        <EnvelopeIcon />
        <div className={styles['body']}>
          <p className={styles['head']}>
            <span className={styles['sender']}>{NOTIFY.sender}</span>
            <span className={styles['time']}>{NOTIFY.time}</span>
          </p>
          <p className={styles['subject']}>{NOTIFY.subject}</p>
          <p className={styles['preview']}>{NOTIFY.preview}</p>
        </div>
      </div>
    </figure>
  )
}
