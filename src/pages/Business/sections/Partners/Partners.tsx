import React from 'react'
import BusinessSection from '../../components/BusinessSection'
import SectionHeading from '../../components/SectionHeading'
import CtaRow from '../../components/CtaRow'
import Card from '../../components/Card'
import Reveal from '../../components/Reveal'
import { CTA_VARIANTS } from '../../sectionsConfig'
import {
  PARTNERS_HEADING,
  PARTNERSHIP_TILE,
  SPONSORS_LABEL,
  STATS,
  TEAMS,
  type Logo,
  type Team,
} from './content'
import styles from './Partners.module.css'

const ID = 'partners'

function LogoImage({ logo, className }: { logo: Logo; className?: string }) {
  return (
    <picture>
      <source srcSet={logo.webp} type="image/webp" />
      <img
        src={logo.png}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  )
}

function TeamCard({ team }: { team: Team }) {
  const labelId = `${ID}-${team.key}-sponsors`
  return (
    <Card as="article" tone="surface" padding="lg" className={styles['team']}>
      <div className={`${styles['crest']} ${styles[`crest-${team.key}`]}`}>
        <LogoImage logo={team.logo} className={styles['crest-img']} />
      </div>
      <div className={styles['team-body']}>
        <h3 className={styles['team-name']}>{team.name}</h3>
        <p className={styles['season']}>{team.season}</p>
        {team.sponsors && team.sponsors.length > 0 && (
          <>
            <p id={labelId} className={styles['sponsors-label']}>
              {SPONSORS_LABEL}
            </p>
            <ul className={styles['sponsors']} aria-labelledby={labelId}>
              {team.sponsors.map((logo) => (
                <li key={logo.alt} className={styles['chip']}>
                  <LogoImage logo={logo} className={styles['chip-img']} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Card>
  )
}

/** US-03: the signed teams, their sponsors and OBS's track record. */
export default function Partners() {
  return (
    <BusinessSection id={ID} tone="indigo">
      <SectionHeading
        id={`${ID}-heading`}
        title={PARTNERS_HEADING.title}
        accent={PARTNERS_HEADING.accent}
        lead={PARTNERS_HEADING.lead}
      />

      <Reveal className={styles['grid']}>
        <div className={styles['teams']}>
          {TEAMS.map((team) => (
            <TeamCard key={team.key} team={team} />
          ))}
        </div>

        <div className={styles['proof']}>
          <ul className={styles['stats']}>
            {STATS.map((stat) => (
              <Card as="li" key={stat.label} tone="surface" className={styles['stat']}>
                <span className={styles['stat-value']}>{stat.value}</span>
                <span className={styles['stat-label']}>{stat.label}</span>
              </Card>
            ))}
            <Card as="li" tone="surface" className={`${styles['stat']} ${styles['stat-text']}`}>
              <p className={styles['stat-copy']}>
                <span className={styles['stat-copy-lead']}>{PARTNERSHIP_TILE.lead}</span>{' '}
                {PARTNERSHIP_TILE.rest}{' '}
                <strong className={styles['stat-copy-name']}>{PARTNERSHIP_TILE.name}</strong>
              </p>
            </Card>
          </ul>
        </div>
      </Reveal>

      <CtaRow className={styles['cta']} label={CTA_VARIANTS.partners} location={ID} />
    </BusinessSection>
  )
}
