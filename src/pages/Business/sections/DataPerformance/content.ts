// Copy for US-07 Data and performance. Every number here is ILLUSTRATIVE:
// the dashboard and fan card both carry a visible "Illustrative example —
// not live data" label. Only metrics the platform actually reports appear
// (no impressions, clicks, revenue, play time or redemptions).

export const DATA_TITLE = 'Know your fans.' // DRAFT, pending OBS
export const DATA_ACCENT = 'Prove the value.' // DRAFT, pending OBS
export const DATA_LEAD =
  'The reporting teams and sponsors get after every game.'

export const DASHBOARD_TITLE = 'Game recap'
export const DASHBOARD_DISCLAIMER = 'Illustrative example — not live data'
export const DASHBOARD_CHIP = 'Illustrative'

export interface Kpi {
  label: string
  value: string
}

export const KPIS: readonly Kpi[] = [
  { label: 'Fans joined', value: '2,480' },
  { label: 'Boards played', value: '1,912' },
  { label: 'Bingos hit', value: '637' },
  { label: 'Prizes delivered', value: '412' },
]

export const TIMELINE_TITLE = 'Over the game'
export const TIMELINE_SERIES = {
  boards: 'Boards started',
  fans: 'Fans joined',
} as const

/**
 * Twelve intervals across the game (four per period). Each series sums to
 * its KPI above: fans joined 2,480, boards started 1,912.
 */
export const TIMELINE: readonly { fans: number; boards: number }[] = [
  { fans: 520, boards: 380 },
  { fans: 610, boards: 470 },
  { fans: 380, boards: 300 },
  { fans: 240, boards: 190 },
  { fans: 190, boards: 150 },
  { fans: 150, boards: 120 },
  { fans: 120, boards: 95 },
  { fans: 90, boards: 70 },
  { fans: 70, boards: 55 },
  { fans: 50, boards: 40 },
  { fans: 40, boards: 30 },
  { fans: 20, boards: 12 },
]

export const TIMELINE_PERIODS = ['1st', '2nd', '3rd'] as const

export const TIMELINE_DESCRIPTION =
  'Illustrative chart of fans joined and boards started across twelve intervals of the game: both peak early in the first period, at about 610 fans and 470 boards, and taper off through the third.'

export const PLAYERS_TITLE = 'Most-picked players'
export const PLAYERS_UNIT = '% of boards'
export const PLAYERS: readonly { name: string; share: number }[] = [
  { name: 'K. Kaprizov', share: 64 },
  { name: 'J. Eriksson Ek', share: 41 },
  { name: 'M. Zuccarello', share: 33 },
]

export const SPONSOR_AUDIENCE = {
  label: 'Sponsor audience',
  value: '1,640',
  text: 'fans opted in to Cub Foods offers',
}

export const FAN_CARD = {
  initials: 'JM',
  name: 'Jordan M.',
  chip: 'Illustrative example',
  stats: [
    { label: 'Games played', value: '3' },
    { label: 'Boards played', value: '3' },
    { label: 'Bingos hit', value: '2' },
  ],
  email: 'j•••••@example.com',
  zip: '55403',
  favoritePlayers: 'Kaprizov, Eriksson Ek',
  optIns: ['Team news', 'Cub Foods offers'],
  optInNote: 'accepted Oct 12',
  joined: 'Oct 2, 2026',
} as const

// Illustrative email notification beside the fan card: what a team could
// send Jordan M., built from the profile's favorite-players field (the
// exportable field, not per-board picks).
export const NOTIFY_CAPTION = 'Illustrative example of a team email to a fan'
export const NOTIFY_CHIP = 'Illustrative'
export const NOTIFY = {
  sender: 'Minnesota Wild',
  time: 'now',
  subject: "Kaprizov is your favorite. Here's 20% off his jersey.",
  preview:
    'Hi Jordan, you told us Kirill Kaprizov is your favorite player. Your 20% jersey code is inside.',
} as const

export const SECURITY_TITLE = 'How fan data is protected' // DRAFT, pending OBS
export const SECURITY_POINTS: readonly string[] = [
  'Encrypted in transit (HTTPS, TLS 1.2+) with uploads stored in encrypted, private cloud storage',
  'Fans sign in with a verified email and password or Google; team admins use multi-factor authentication with admin and read-only roles',
  "Every team's fan data is isolated per tenant and enforced on the server",
  'Consent is recorded with the exact wording, time and method; sponsors only receive the fields fans agreed to',
  'Exports and contact-detail reveals are audited',
]
