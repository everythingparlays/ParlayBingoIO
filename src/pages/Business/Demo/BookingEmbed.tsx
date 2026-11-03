import React from 'react'
import CalComEmbed from './providers/CalComEmbed'

export interface BookingEmbedProps {
  /** The provider's event link, from BOOKING_LINK in businessConfig. */
  link: string
  /** Fired when a booking is confirmed inside the embed (may fire twice; the page dedupes). */
  onBooked: () => void
  /** The booking page finished loading inside the embed. */
  onReady?: () => void
  /** The link could not be loaded (e.g. an unknown event link). */
  onFailed?: () => void
}

export default function BookingEmbed(props: BookingEmbedProps) {
  // The only place that knows which booking provider is in use (Cal.com today).
  // Swapping providers = add providers/<Provider>Embed.tsx implementing
  // BookingEmbedProps, replace this one line, and update BOOKING_LINK.
  return <CalComEmbed {...props} />
}
