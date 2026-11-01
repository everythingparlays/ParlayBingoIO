// Copy and assets for US-06 Sponsor activation. Verbatim from the page brief.

export const SPONSOR_TITLE = 'Give your sponsors'
export const SPONSOR_ACCENT = 'more than a logo.'
export const SPONSOR_LEAD =
  'An interactive, branded fan experience instead of passive logo placement.'

export const BOARD_SCREEN = {
  src: '/assets/images/business/screen-wild-board.png',
  // 378px-wide source: shown at 280 CSS px it is slightly soft on 2x screens
  width: 378,
  height: 734,
  alt: 'Minnesota Wild game board sponsored by Cub: prize tier tracker, Cub pickup and delivery banner, player stat squares, a Cub free square and a Shop at Cub Foods button',
}

export interface SponsorCallout {
  id: string
  label: string
  /**
   * Target point on the board screen, as fractions of the 378x734 capture.
   * Each sits on the left edge of its element so the leader line stops
   * short of the content it points at.
   */
  x: number
  y: number
}

// Ordered top to bottom as they appear on the screen.
export const SPONSOR_CALLOUTS: readonly SponsorCallout[] = [
  // tier tracker: start of the progress bar (Bronze / Silver / Gold)
  { id: 'tiers', label: 'Tiered sponsor prizes', x: 0.1, y: 0.143 },
  // "Cub pickup & delivery" banner: its left edge
  { id: 'banner', label: 'Sponsor banner', x: 0.045, y: 0.338 },
  // centre "Cub FREE SQUARE": its left edge
  { id: 'free', label: 'Logo on the free square', x: 0.372, y: 0.66 },
  // "SHOP AT CUB FOODS" button: its left end
  { id: 'link', label: 'Sponsor link button', x: 0.05, y: 0.958 },
]

export const COMPARE_HEAD_STATIC = 'Static signage'
export const COMPARE_HEAD_OBS = 'OBS Stadium Game'

export interface CompareRow {
  aspect: string
  static: string
  obs: string
}

export const COMPARE_ROWS: readonly CompareRow[] = [
  {
    aspect: 'Interaction',
    static: 'Seen in passing',
    obs: 'Fans actively play',
  },
  { aspect: 'Exposure', static: 'A glance', obs: 'The whole game' },
  {
    aspect: 'Traffic',
    static: 'Hard to attribute',
    obs: 'Link button and digital offers send fans straight to the sponsor',
  },
  { aspect: 'Measurement', static: 'Estimated', obs: 'Measurable' },
]

export interface SponsorStat {
  /** Bold lead (1rem 700 white). */
  lead: string
  /** Optional continuation (0.875rem secondary ink). Together they read as the brief's phrase. */
  rest?: string
}

export const SPONSOR_STATS: readonly SponsorStat[] = [
  { lead: '7+ branding locations' },
  { lead: 'Clickable link', rest: 'drives traffic direct to the sponsor' },
  { lead: 'Digital coupons', rest: 'drive fans to your store' },
  { lead: 'Customizable and testable' },
  { lead: 'Emails collected' },
]

export const SPONSOR_BENEFITS: readonly string[] = [
  '25x more time spent engaging with your brand',
  'Directly drive conversions with digital prizes',
  'Collect fan emails and craft personalized outreach',
]
