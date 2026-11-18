// Copy for US-08 FAQ. `answer: null` renders the visible
// "[PLACEHOLDER] Answer pending from OBS" marker; every written answer is a
// DRAFT and renders with <DraftNote />. Never draft the betting/legal answer.

export const FAQ_TITLE = 'Questions teams ask'
export const FAQ_ACCENT = 'before they book.'

export interface FaqItem {
  question: string
  /** Drafted answer (pending OBS approval), or null while OBS has not supplied one. */
  answer: string | null
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'What is the OBS Stadium Game?',
    answer:
      "A team- and sponsor-branded, mobile-first live-event experience built on OBS's 3×3 bingo-style game. Fans play along with the live action, hit bingos as the game unfolds and win tiered sponsor prizes.",
  },
  {
    question: 'How do fans join and play?',
    answer:
      "Fans scan a QR code or join through your team's app, pick their players, get a board of game stats and hit bingos as the game unfolds.",
  },
  {
    question: 'Can the game use our team and sponsor branding?',
    answer:
      'Yes. The game is branded for your team, and sponsors appear in the board banner, the prizes and offers and the winner state, integrated into the game rather than added as a logo.',
  },
  {
    question: 'What sports and events can it support?',
    answer: null,
  },
  {
    question: 'Can sponsors provide prizes or offers?',
    answer:
      'Yes. Sponsors provide tiered prizes such as digital coupons and offers, which fans redeem online or at sponsor locations.',
  },
  {
    question: 'Is this betting? Is it legal?',
    answer: null, // never draft this one: legal answer must come from OBS
  },
  {
    question: 'What does our organization need to provide?',
    answer: null,
  },
  {
    question: 'How can we see a demo?',
    answer:
      'Book a personalized demo with the OBS team using any of the demo buttons on this page.',
  },
]

export const FAQ_PENDING = 'Answer pending from OBS'
export const FAQ_MORE_PROMPT = 'Got more questions?'
