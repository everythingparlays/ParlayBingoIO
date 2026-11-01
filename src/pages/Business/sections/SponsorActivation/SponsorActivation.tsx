import React from 'react'
import BusinessSection from '../../components/BusinessSection'
import SectionHeading from '../../components/SectionHeading'
import CtaRow from '../../components/CtaRow'
import Card from '../../components/Card'
import Reveal from '../../components/Reveal'
import PhoneFrame from '../../components/PhoneFrame'
import { CTA_VARIANTS } from '../../sectionsConfig'
import {
  BOARD_SCREEN,
  COMPARE_HEAD_OBS,
  COMPARE_HEAD_STATIC,
  COMPARE_ROWS,
  SPONSOR_ACCENT,
  SPONSOR_BENEFITS,
  SPONSOR_CALLOUTS,
  SPONSOR_LEAD,
  SPONSOR_STATS,
  SPONSOR_TITLE,
} from './content'
import styles from './SponsorActivation.module.css'

// PhoneFrame's status-bar inset is 12% of the frame width and the screen
// 91%: grow the screen's aspect by that strip so the capture fits uncropped.
const SCREEN_ASPECT = `${BOARD_SCREEN.width} / ${Math.round(
  BOARD_SCREEN.height + (BOARD_SCREEN.width * 12) / 91
)}`

type PointStyle = React.CSSProperties & { '--x': number; '--y': number }

function Check() {
  return (
    <svg className={styles['check']} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.5 8.4l2.9 2.9 6.1-6.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * US-06: the Wild x Cub board with four sponsor-placement callouts, a
 * static-signage comparison, a five-tile capability strip and three
 * headline benefits.
 */
export default function SponsorActivation() {
  return (
    <BusinessSection id="sponsor" tone="textured">
      <div className={styles['layout']}>
        <SectionHeading
          id="sponsor-heading"
          title={SPONSOR_TITLE}
          accent={SPONSOR_ACCENT}
          lead={SPONSOR_LEAD}
        />

        {/* Block A: annotated board + comparison */}
        <Reveal className={styles['showcase']}>
          <div className={styles['stage']}>
            <div className={styles['device']}>
              <PhoneFrame
                size="md"
                className={styles['phone']}
                screenAspect={SCREEN_ASPECT}
              >
                <img
                  src={BOARD_SCREEN.src}
                  width={BOARD_SCREEN.width}
                  height={BOARD_SCREEN.height}
                  alt={BOARD_SCREEN.alt}
                  loading="lazy"
                  decoding="async"
                />
              </PhoneFrame>

              {/* target dots on the screen: the same gradient dot as the chips */}
              {SPONSOR_CALLOUTS.map((c) => (
                <span
                  key={c.id}
                  className={styles['target']}
                  style={{ '--x': c.x, '--y': c.y } as PointStyle}
                  aria-hidden="true"
                />
              ))}
            </div>

            <ul
              className={styles['callouts']}
              aria-label="Where the sponsor appears on the board"
            >
              {SPONSOR_CALLOUTS.map((c) => (
                <li
                  key={c.id}
                  className={styles['callout']}
                  style={{ '--x': c.x, '--y': c.y } as PointStyle}
                >
                  <Card
                    as="span"
                    tone="surface"
                    radius="md"
                    className={styles['chip']}
                  >
                    <span className={styles['dot']} aria-hidden="true" />
                    <span className={styles['chip-text']}>{c.label}</span>
                  </Card>
                  <span className={styles['leader']} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>

          <Card tone="surface" padding="lg" className={styles['compare']}>
            <div
              role="table"
              aria-label={`${COMPARE_HEAD_STATIC} compared with the ${COMPARE_HEAD_OBS}`}
              className={styles['table']}
            >
              <div role="rowgroup">
                <div
                  role="row"
                  className={`${styles['row']} ${styles['head']}`}
                >
                  <span role="cell" className={styles['corner']} />
                  <span role="columnheader" className={styles['head-static']}>
                    {COMPARE_HEAD_STATIC}
                  </span>
                  <span role="columnheader" className={styles['head-obs']}>
                    {COMPARE_HEAD_OBS}
                  </span>
                </div>
              </div>
              <div role="rowgroup">
                {COMPARE_ROWS.map((row) => (
                  <div role="row" key={row.aspect} className={styles['row']}>
                    <span role="rowheader" className={styles['aspect']}>
                      {row.aspect}
                    </span>
                    <span role="cell" className={styles['static']}>
                      {row.static}
                    </span>
                    <span role="cell" className={styles['obs']}>
                      <Check />
                      <span className={styles['obs-text']}>{row.obs}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Block B: capability strip */}
        <ul className={styles['stats']}>
          {SPONSOR_STATS.map((s) => (
            <Card
              as="li"
              key={s.lead}
              tone="outline"
              radius="md"
              padding="sm"
              className={styles['stat']}
            >
              <span className={styles['stat-lead']}>{s.lead}</span>
              {s.rest && (
                <>
                  {' '}
                  <span className={styles['stat-rest']}>{s.rest}</span>
                </>
              )}
            </Card>
          ))}
        </ul>

        {/* Block C: hard benefits */}
        <ul className={styles['benefits']}>
          {SPONSOR_BENEFITS.map((b) => (
            <li key={b} className={styles['benefit']}>
              {b}
            </li>
          ))}
        </ul>

        <CtaRow label={CTA_VARIANTS.sponsor} location="sponsor" />
      </div>
    </BusinessSection>
  )
}
