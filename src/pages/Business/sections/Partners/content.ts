// Copy + assets for US-03 Partners and credibility. Verbatim from the build
// brief; nothing here may be extended without OBS sign-off.

const IMG = '/assets/images/business'

export const PARTNERS_HEADING = {
  title: 'Built for teams, venues,',
  accent: 'and partners.',
  lead: 'Signed for the 2026-27 hockey season, with the sponsors fans already know.',
}

export interface Logo {
  /** .webp source (preferred) */
  webp: string
  /** .png fallback */
  png: string
  alt: string
  /** intrinsic pixel size of the png/webp, for the width/height attributes */
  width: number
  height: number
}

export interface Team {
  key: string
  name: string
  season: string
  logo: Logo
  /** null = sponsor logos not supplied yet (renders a placeholder) */
  sponsors: Logo[] | null
  sponsorsPending?: string
}

export const SPONSORS_LABEL = 'Sponsors'

export const TEAMS: Team[] = [
  {
    key: 'wild',
    name: 'Minnesota Wild',
    season: '2026-27 season',
    logo: {
      webp: `${IMG}/logo-minnesota-wild.webp`,
      png: `${IMG}/logo-minnesota-wild.png`,
      alt: 'Minnesota Wild logo',
      width: 250,
      height: 162,
    },
    sponsors: [
      {
        webp: `${IMG}/logo-cub-256.webp`,
        png: `${IMG}/logo-cub.png`,
        alt: 'Cub Foods logo',
        width: 256,
        height: 256,
      },
      {
        webp: `${IMG}/logo-old-dutch.webp`,
        png: `${IMG}/logo-old-dutch.png`,
        alt: 'Old Dutch logo',
        width: 352,
        height: 283,
      },
      {
        webp: `${IMG}/logo-coca-cola-480.webp`,
        png: `${IMG}/logo-coca-cola.png`,
        alt: 'Coca-Cola logo',
        width: 480,
        height: 157,
      },
    ],
  },
  {
    key: 'und',
    name: "University of North Dakota Men's Hockey",
    season: '2026-27 season',
    logo: {
      webp: `${IMG}/logo-und.webp`,
      png: `${IMG}/logo-und.png`,
      alt: 'University of North Dakota logo',
      width: 461,
      height: 219,
    },
    sponsors: null,
    sponsorsPending: 'UND sponsor logos pending',
  },
]

export interface Stat {
  value: string
  label: string
}

export const STATS: Stat[] = [
  { value: '15,000+', label: 'Contest entries' },
  { value: '3+ years', label: 'Consumer sports bingo experience' },
]

// Text tile: the first words are set larger, the rest stays one tile.
export const PARTNERSHIP_TILE = {
  lead: 'Partnerships with industry professionals and athletes,',
  rest: 'including',
  name: 'Andruw Jones',
}

export const TESTIMONIALS_PENDING = 'Partner testimonials pending'
