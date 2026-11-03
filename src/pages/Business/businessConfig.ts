// Single source of truth for the /business (OBS Stadium Game) landing page.
// Copy, links and the active hero headline all live here so content changes
// never require touching layout code.

export const BUSINESS_PATH = '/business'

// Demo-booking page. Every "Book a demo" CTA links here (getBookDemoHref());
// the page embeds the OBS calendar, or a holding panel until it is set.
export const DEMO_PATH = '/business/demo'

// The Cal.com event link (the part after cal.com/, e.g. "obs/demo"), to be
// provided by OBS. Leave as null until then: /business/demo then shows a
// holding panel with the support email and never loads the Cal.com embed.
export const CALCOM_EVENT_LINK: string | null = null

// Support address: the site-wide constant (also used by the header and footer).
export { SUPPORT_EMAIL } from 'constants/contact'

export function getBookDemoHref(): string {
  return DEMO_PATH
}

export function isCalcomConfigured(): boolean {
  return CALCOM_EVENT_LINK !== null
}

export interface HeroHeadline {
  lines: string[]
  accentLine: string
}

// Stored in natural case; uppercase is applied in CSS.
export const HERO_HEADLINES: Record<'A' | 'B' | 'C', HeroHeadline> = {
  A: { lines: ['The future of'], accentLine: 'game-day sponsorship' },
  B: { lines: ["Fans don't remember"], accentLine: 'advertisements' },
  C: { lines: ['The activation', 'fans actually'], accentLine: 'want to play' },
}

export const ACTIVE_HEADLINE: keyof typeof HERO_HEADLINES = 'C'

export const HERO_EYEBROW_PRODUCT = 'OBS Stadium Game'
export const HERO_EYEBROW_TAGLINE =
  'Live-event fan engagement for teams and sponsors'

export const HERO_DESCRIPTION =
  'Create unforgettable game-day activations that fans love and sponsors are proud to be part of.'

export const HERO_CREDIBILITY =
  "Playing with University of North Dakota Men's Hockey and the Minnesota Wild for the 2026-27 season."

export const CTA_LABEL_PRIMARY = 'Book a Personalized Demo'
