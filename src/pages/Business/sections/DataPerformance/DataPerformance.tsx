import React from 'react'
import BusinessSection from '../../components/BusinessSection'
import SectionHeading from '../../components/SectionHeading'
import CtaRow from '../../components/CtaRow'
import Card from '../../components/Card'
import Reveal from '../../components/Reveal'
import { DraftNote } from '../../components/Placeholder'
import { CTA_VARIANTS } from '../../sectionsConfig'
import {
  DASHBOARD_CHIP,
  DASHBOARD_DISCLAIMER,
  DASHBOARD_TITLE,
  DATA_ACCENT,
  DATA_LEAD,
  DATA_TITLE,
  FAN_CARD,
  KPIS,
  PLAYERS,
  PLAYERS_TITLE,
  PLAYERS_UNIT,
  SECURITY_POINTS,
  SECURITY_TITLE,
  SPONSOR_AUDIENCE,
  TIMELINE,
  TIMELINE_DESCRIPTION,
  TIMELINE_PERIODS,
  TIMELINE_SERIES,
  TIMELINE_TITLE,
} from './content'
import styles from './DataPerformance.module.css'

const SECTION_ID = 'data'

// Chart scale: the tallest bar (610) sits just under the top gridline.
const TIMELINE_MAX = 640
const pct = (n: number) => `${((n / TIMELINE_MAX) * 100).toFixed(1)}%`

function CheckGlyph() {
  return (
    <svg
      className={styles['check']}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="10"
        cy="10"
        r="9.25"
        stroke="rgba(248,172,28,0.55)"
        strokeWidth="1.5"
      />
      <path
        d="M6 10.4l2.6 2.6L14 7.6"
        stroke="#f8ac1c"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Timeline() {
  return (
    <div className={`${styles['panel']} ${styles['timeline']}`}>
      <div className={styles['panel-head']}>
        <p className={styles['panel-title']}>{TIMELINE_TITLE}</p>
        <ul className={styles['legend']} aria-hidden="true">
          <li className={styles['legend-item']}>
            <span
              className={`${styles['swatch']} ${styles['swatch-boards']}`}
            />
            <span className={styles['legend-label']}>
              {TIMELINE_SERIES.boards}
            </span>
          </li>
          <li className={styles['legend-item']}>
            <span className={`${styles['swatch']} ${styles['swatch-fans']}`} />
            <span className={styles['legend-label']}>
              {TIMELINE_SERIES.fans}
            </span>
          </li>
        </ul>
      </div>

      <p className="biz-sr-only">{TIMELINE_DESCRIPTION}</p>

      <div className={styles['chart']} aria-hidden="true">
        <div className={styles['plot-wrap']}>
          <div className={styles['periods']}>
            {TIMELINE_PERIODS.map((period) => (
              <span key={period} />
            ))}
          </div>
          <div className={styles['plot']}>
            {TIMELINE.map((point, i) => (
              <div key={i} className={styles['group']}>
                <span
                  className={`${styles['bar']} ${styles['bar-boards']}`}
                  style={{ height: pct(point.boards) }}
                />
                <span
                  className={`${styles['bar']} ${styles['bar-fans']}`}
                  style={{ height: pct(point.fans) }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles['axis']}>
          {TIMELINE_PERIODS.map((period) => (
            <span key={period} className={styles['axis-label']}>
              {period}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Players() {
  return (
    <div className={styles['panel']}>
      <div className={styles['panel-head']}>
        <p className={styles['panel-title']}>{PLAYERS_TITLE}</p>
        <p className={styles['panel-unit']}>{PLAYERS_UNIT}</p>
      </div>
      <ol className={styles['players']}>
        {PLAYERS.map((player) => (
          <li key={player.name} className={styles['player']}>
            <span className={styles['player-name']}>{player.name}</span>
            <span className={styles['player-share']}>{player.share}%</span>
            <span className={styles['player-track']} aria-hidden="true">
              <span
                className={styles['player-fill']}
                style={{ width: `${player.share}%` }}
              />
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SponsorAudience() {
  return (
    <div className={`${styles['panel']} ${styles['audience']}`}>
      <p className={styles['panel-title']}>{SPONSOR_AUDIENCE.label}</p>
      <p className={styles['audience-line']}>
        <span className={styles['audience-value']}>
          {SPONSOR_AUDIENCE.value}
        </span>{' '}
        <span className={styles['audience-text']}>{SPONSOR_AUDIENCE.text}</span>
      </p>
    </div>
  )
}

function Dashboard() {
  return (
    <Card
      as="figure"
      tone="outline"
      padding="sm"
      className={styles['dashboard']}
      aria-labelledby="data-dashboard-caption"
    >
      <figcaption id="data-dashboard-caption" className={styles['topbar']}>
        <span className={styles['topbar-text']}>
          <span className={styles['topbar-title']}>{DASHBOARD_TITLE}</span>
          <span className={styles['topbar-sep']} aria-hidden="true">
            {' · '}
          </span>
          <span className={styles['topbar-note']}>{DASHBOARD_DISCLAIMER}</span>
        </span>
        <span className={styles['chip']} aria-hidden="true">
          {DASHBOARD_CHIP}
        </span>
      </figcaption>

      <div className={styles['dash-body']}>
        <ul className={styles['kpis']}>
          {KPIS.map((kpi) => (
            <li key={kpi.label} className={styles['kpi']}>
              <span className={styles['kpi-label']}>{kpi.label}</span>{' '}
              <span className={styles['kpi-value']}>{kpi.value}</span>
            </li>
          ))}
        </ul>

        <div className={styles['dash-grid']}>
          <Timeline />
          <div className={styles['dash-side']}>
            <Players />
            <SponsorAudience />
          </div>
        </div>
      </div>
    </Card>
  )
}

function FanCard() {
  return (
    <Card
      as="figure"
      tone="surface"
      padding="md"
      className={styles['fan']}
      aria-label={`Fan profile for ${FAN_CARD.name}, ${FAN_CARD.chip}`}
    >
      <div className={styles['fan-head']}>
        <span className={styles['avatar']} aria-hidden="true">
          {FAN_CARD.initials}
        </span>
        <div className={styles['fan-id']}>
          <p className={styles['fan-name']}>{FAN_CARD.name}</p>
          <span className={styles['chip']}>{FAN_CARD.chip}</span>
        </div>
      </div>

      <dl className={styles['fan-stats']}>
        {FAN_CARD.stats.map((stat) => (
          <div key={stat.label} className={styles['fan-stat']}>
            <dt className={styles['fan-stat-label']}>{stat.label}</dt>
            <dd className={styles['fan-stat-value']}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <dl className={styles['fan-rows']}>
        <div className={styles['fan-row']}>
          <dt>Email</dt>
          <dd>{FAN_CARD.email}</dd>
        </div>
        <div className={styles['fan-row']}>
          <dt>ZIP</dt>
          <dd>{FAN_CARD.zip}</dd>
        </div>
        <div className={styles['fan-row']}>
          <dt>Favorite players</dt>
          <dd>{FAN_CARD.favoritePlayers}</dd>
        </div>
        <div className={styles['fan-row']}>
          <dt>Opt-ins</dt>
          <dd>
            <span className={styles['optins']}>
              {FAN_CARD.optIns.map((optIn) => (
                <span key={optIn} className={styles['optin']}>
                  {optIn}{' '}
                  <span className={styles['optin-check']} aria-hidden="true">
                    ✓
                  </span>
                  <span className="biz-sr-only">(opted in)</span>
                </span>
              ))}
            </span>
            <span className={styles['optin-note']}>({FAN_CARD.optInNote})</span>
          </dd>
        </div>
        <div className={styles['fan-row']}>
          <dt>Joined</dt>
          <dd>{FAN_CARD.joined}</dd>
        </div>
      </dl>
    </Card>
  )
}

/**
 * US-07 Data and performance: an illustrative post-game dashboard, an
 * illustrative fan profile card, and how fan data is protected.
 */
export default function DataPerformance() {
  return (
    <BusinessSection id={SECTION_ID} tone="dark">
      <SectionHeading
        id={`${SECTION_ID}-heading`}
        title={DATA_TITLE}
        accent={DATA_ACCENT}
        lead={
          <>
            {DATA_LEAD} <DraftNote className={styles['lead-draft']} />
          </>
        }
      />

      <Reveal className={styles['dash-wrap']}>
        <Dashboard />
      </Reveal>

      <div className={styles['lower']}>
        <FanCard />

        <div className={styles['security']}>
          <h3 className={styles['security-title']}>{SECURITY_TITLE}</h3>
          <DraftNote className={styles['security-draft']} />
          <ul className={styles['security-list']}>
            {SECURITY_POINTS.map((point) => (
              <li key={point} className={styles['security-item']}>
                <CheckGlyph />
                <span className={styles['security-text']}>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CtaRow
        label={CTA_VARIANTS.data}
        location={SECTION_ID}
        className={styles['cta']}
      />
    </BusinessSection>
  )
}
