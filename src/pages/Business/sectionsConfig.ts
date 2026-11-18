// Shared copy constants for the /business sections, so every section's
// call to action stays consistent. Section-specific copy lives with each
// section (or in businessConfig.ts for the hero).

export type CtaVariantKey =
  | 'hero'
  | 'partners'
  | 'benefits'
  | 'journey'
  | 'sponsor'
  | 'data'
  | 'faq'
  | 'final'

/**
 * Book-a-demo button labels, one per section. Pass to <CtaRow label={...} />.
 * All verbatim from the page requirements doc (sponsor uses the doc's
 * section-1 wording "Request a Customized Demo"; data uses section 2.2's
 * "Request a Demo").
 */
export const CTA_VARIANTS: Readonly<Record<CtaVariantKey, string>> = {
  hero: 'Book a Personalized Demo',
  partners: 'See what it would look like for your team',
  benefits: 'Level up your sponsorships',
  journey: 'See a branded demo for your team and sponsors',
  sponsor: 'Request a Customized Demo',
  data: 'Request a Demo',
  faq: 'Speak with the team',
  final: 'Book a Personalized Demo',
}
