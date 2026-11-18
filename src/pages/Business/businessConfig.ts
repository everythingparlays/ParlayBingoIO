// Single source of truth for the /business (OBS Stadium Game) landing page.
// Copy, links and the active hero headline all live here so content changes
// never require touching layout code.

export const BUSINESS_PATH = '/business'

// Calendar booking link — to be provided by OBS. Leave as null until then.
// Every CTA on the page must use getBookDemoHref() rather than this constant,
// so the email fallback (and the visible placeholder note) switch off
// automatically the moment a real URL is set here.
export const BOOK_DEMO_URL: string | null = null

// Support address already published in the site footer.
export const CONTACT_FALLBACK_HREF =
  'mailto:support@everythingparlays.com?subject=OBS%20Stadium%20Game%20demo'

export function getBookDemoHref(): string {
  return BOOK_DEMO_URL ?? CONTACT_FALLBACK_HREF
}

export function isBookDemoPlaceholder(): boolean {
  return BOOK_DEMO_URL === null
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
