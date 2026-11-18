// Copy for US-04 Team business benefits. Verbatim from the build brief.
// No numbers anywhere in this section.

export const BENEFITS_HEADING = {
  title: 'More value.',
  accent: 'Every game.',
  lead: 'Three business outcomes, in a quick scan.',
}

/** Front-face hint: the card flips on hover where the primary pointer can
 * hover, and on tap elsewhere. Both render; CSS shows the one that fits. */
export const FLIP_HINT = {
  hover: 'Hover to see how',
  tap: 'Tap to see how',
} as const

export type BenefitIcon = 'cash' | 'whistle' | 'target'

export interface Benefit {
  key: string
  icon: BenefitIcon
  title: string
  body: string
}

export const BENEFITS: Benefit[] = [
  {
    key: 'revenue',
    icon: 'cash',
    title: 'Maximize Sponsorship Revenue',
    body: 'Start screen, board banner, prize credit and opt-in leads: inventory sponsors pay for.',
  },
  {
    key: 'engagement',
    icon: 'whistle',
    title: 'Deepen Fan Engagement',
    body: 'Fans draft up to 8 players, then every bingo tier they reach pops a prize.',
  },
  {
    key: 'retargeting',
    icon: 'target',
    title: 'Enhance Fan Retargeting',
    body: 'Every fan on record: email, the profile fields you choose, consent with its exact wording.',
  },
]
