// Copy and assets for US-05 Fan journey. Verbatim from the page brief.

// U+2060 word joiners keep "three-step" together on narrow screens (Satoshi
// has no non-breaking hyphen glyph; the joiner is invisible and unspoken).
export const JOURNEY_TITLE = 'A simple three\u2060-\u2060step'
export const JOURNEY_ACCENT = 'game-day experience.'
export const JOURNEY_LEAD =
  'Customized for your team and your sponsor, and played alongside the live action.'

const IMG_BASE = '/assets/images/business'

export interface JourneyStep {
  label: string
  caption: string
  src: string
  /** Native pixel size of the screen capture (all ~378px wide: keep the frame at 190 CSS px max). */
  width: number
  height: number
  alt: string
}

export const JOURNEY_STEPS: readonly JourneyStep[] = [
  {
    label: 'Join the game',
    caption: "Fans scan a QR code or join directly through your team's app",
    src: `${IMG_BASE}/screen-wild-pick-players.png`,
    width: 378,
    height: 734,
    alt: 'Pick your players screen: a fan chooses Minnesota Wild players for their bingo board',
  },
  {
    label: 'Play along live',
    caption:
      'Fans hit bingos tied to live game action and win tiered sponsor prizes',
    src: `${IMG_BASE}/screen-wild-board.png`,
    width: 378,
    height: 734,
    alt: 'Minnesota Wild game board with the Cub prize tiers, a Cub banner, player stat squares and a Cub free square',
  },
  {
    label: 'Redeem with the sponsor',
    caption: 'Fans redeem prizes online or at sponsor locations',
    src: `${IMG_BASE}/screen-wild-prize-silver.png`,
    width: 376,
    height: 734,
    alt: 'Silver tier prize screen: $15 off groceries from Cub',
  },
]
