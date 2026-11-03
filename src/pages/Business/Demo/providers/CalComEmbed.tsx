import React, { useEffect, useRef } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import type { BookingEmbedProps } from '../BookingEmbed'

// Cal.com implementation of BookingEmbed. Reached only through BookingEmbed,
// which DemoPage lazy-loads when BOOKING_LINK is set, so neither this code
// nor Cal's embed.js is ever requested by other routes or by the holding state.
// `link` is the Cal.com event link (the part after cal.com/), e.g. "obs/demo".

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

// min-height: inherit picks up the card's reserved loading height.
const EMBED_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 'inherit',
  overflow: 'auto',
}

/**
 * Inline Cal.com booker in the site's dark theme with the gold brand
 * colour. Cal.com branding can't be hidden from the embed API; it is a
 * Teams-plan setting on OBS's Cal.com account (Appearance -> Hide branding).
 */
export default function CalComEmbed({
  link,
  onBooked,
  onReady,
  onFailed,
}: BookingEmbedProps) {
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
    <Cal calLink={link} config={INLINE_CONFIG} style={EMBED_STYLE} />
  )
}
