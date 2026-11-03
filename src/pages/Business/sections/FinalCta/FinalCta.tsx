import React from 'react'
import HeroIconTrophy from 'components/svg/HeroIconTrophy'
import BusinessSection from '../../components/BusinessSection'
import SectionHeading from '../../components/SectionHeading'
import CtaRow from '../../components/CtaRow'
import Reveal from '../../components/Reveal'
import { DraftNote } from '../../components/Placeholder'
import { CTA_VARIANTS } from '../../sectionsConfig'
import { FINAL_CTA_HEADING, FINAL_EXPECTATION } from './content'
import styles from './FinalCta.module.css'

const SECTION_ID = 'final-cta'

/**
 * US-09 Final CTA: the page's closing ask, centred, with the hero's trophy
 * sticker bobbing off the heading's top-right corner. No separator: the
 * footer draws its own bar.
 */
export default function FinalCta() {
  return (
    <BusinessSection
      id={SECTION_ID}
      tone="textured"
      separator={false}
      className={styles['section']}
    >
      <Reveal className={styles['block']}>
        <div className={styles['heading-wrap']}>
          <SectionHeading
            id={`${SECTION_ID}-heading`}
            title={FINAL_CTA_HEADING.title}
            accent={FINAL_CTA_HEADING.accent}
            align="center"
            size="xl"
          />
          <div className={styles['trophy-bob']} aria-hidden="true">
            <div className={styles['trophy-tilt']}>
              <HeroIconTrophy width="100%" height="100%" />
            </div>
          </div>
        </div>

        <p className={styles['expectation']}>{FINAL_EXPECTATION}</p>
        <DraftNote className={styles['draft']} />

        <CtaRow
          label={CTA_VARIANTS.final}
          location={SECTION_ID}
          align="center"
          size="lg"
          className={styles['cta']}
        />
      </Reveal>
    </BusinessSection>
  )
}
