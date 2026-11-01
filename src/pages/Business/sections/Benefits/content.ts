// Copy for US-04 Team business benefits. Verbatim from the build brief.
// No numbers anywhere in this section.

export const BENEFITS_HEADING = {
  title: 'More value.',
  accent: 'Every game.',
  lead: 'Three business outcomes, in a quick scan.',
}

export const FLIP_HINT = 'Tap to see how'

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
    body: 'Sitting as a premium piece of sponsorship inventory, OverBoard helps teams get the best rates from their sponsors while providing higher sponsor ROI',
  },
  {
    key: 'engagement',
    icon: 'whistle',
    title: 'Deepen Fan Engagement',
    body: 'Exciting and novel gameplay mechanics leave fans with a memorable gameday experience that they will talk about',
  },
  {
    key: 'retargeting',
    icon: 'target',
    title: 'Enhance Fan Retargeting',
    body: 'OverBoard builds a more comprehensive profile of each fan to ensure future ticket sales, merch deals, and sponsor offers reach the right audience',
  },
]
