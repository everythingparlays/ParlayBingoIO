import React, { useEffect, useRef } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

// Loaded only by /business/demo (React.lazy in DemoPage), and only when a
// Cal.com event link is configured, so neither this chunk nor Cal's
// embed.js is ever requested by other routes or by the holding state.

const BRAND = '#F8AC1C'

// Cal's dark theme paints the booker #0f0f0f; match it to the page's card
// surface (--biz-surface) and hairlines instead so it reads as one panel.
const DARK_VARS = {
  'cal-brand': BRAND,
  'cal-bg': '#1d184c',
  'cal-bg-muted': '#231d58',
  'cal-bg-subtle': '#2a2465',
  'cal-bg-emphasis': '#38317c',
  'cal-border': 'rgba(255, 255, 255, 0.16)',
  'cal-border-subtle': 'rgba(255, 255, 255, 0.12)',
  'cal-border-booker': 'rgba(255, 255, 255, 0.12)',
  'cal-text-muted': '#c9cfea',
  'cal-text-subtle': '#848fbf',
}

// Inline-embed attributes, passed to the booker iframe as query params.
// Module-level so the object identity is stable across renders.
const INLINE_CONFIG = { layout: 'month_view', theme: 'dark' } as const

const EMBED_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
}

export interface CalEmbedProps {
  /** Cal.com event link (the part after cal.com/), e.g. "obs/demo". */
  calLink: string
  /** Fired once a booking is confirmed inside the embed. */
  onBooked: () => void
  /** The booker page loaded inside the iframe. */
  onReady?: () => void
  /** The link could not be loaded (e.g. a 404 event link). */
  onFailed?: () => void
  className?: string
}

/**
 * Inline Cal.com booker in the site's dark theme with the gold brand
 * colour. Cal.com branding can't be hidden from the embed API; it is a
 * Teams-plan setting on OBS's Cal.com account (Appearance -> Hide branding).
 */
export default function CalEmbed({
  calLink,
  onBooked,
  onReady,
  onFailed,
  className,
}: CalEmbedProps) {
  // Keep the latest callbacks without re-registering Cal listeners.
  const handlers = useRef({ onBooked, onReady, onFailed })
  useEffect(() => {
    handlers.current = { onBooked, onReady, onFailed }
  }, [onBooked, onReady, onFailed])

  useEffect(() => {
    let cancelled = false
    let unsubscribe: (() => void) | undefined

    ;(async () => {
      const cal = await getCalApi()
      if (cancelled) return

      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          dark: DARK_VARS,
          light: { 'cal-brand': BRAND },
        },
      })

      const handleBooked = () => handlers.current.onBooked()
      const handleReady = () => handlers.current.onReady?.()
      const handleFailed = () => handlers.current.onFailed?.()
      // bookingSuccessfulV2 is the current event; bookingSuccessful is its
      // deprecated predecessor, kept as a fallback. The page dedupes.
      cal('on', { action: 'bookingSuccessfulV2', callback: handleBooked })
      cal('on', { action: 'bookingSuccessful', callback: handleBooked })
      cal('on', { action: 'linkReady', callback: handleReady })
      cal('on', { action: 'linkFailed', callback: handleFailed })
      unsubscribe = () => {
        cal('off', { action: 'bookingSuccessfulV2', callback: handleBooked })
        cal('off', { action: 'bookingSuccessful', callback: handleBooked })
        cal('off', { action: 'linkReady', callback: handleReady })
        cal('off', { action: 'linkFailed', callback: handleFailed })
      }
    })()

    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [])

  return (
    <Cal
      calLink={calLink}
      config={INLINE_CONFIG}
      style={EMBED_STYLE}
      className={className}
    />
  )
}
