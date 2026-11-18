import React from 'react'
import { Helmet } from 'react-helmet-async'
import LinearGradient from 'ui/LinearGradient'
import BusinessHero from './components/BusinessHero'
import Partners from './sections/Partners'
import Benefits from './sections/Benefits'
import FanJourney from './sections/FanJourney'
import SponsorActivation from './sections/SponsorActivation'
import DataPerformance from './sections/DataPerformance'
import Faq from './sections/Faq'
import FinalCta from './sections/FinalCta'
import styles from './Business.module.css'
// page tokens + utilities, scoped under #business (see the file header)
import './components/business-tokens.css'
import { BUSINESS_PATH } from './businessConfig'

const SITE_URL = 'https://overboardsports.com'
const CANONICAL = `${SITE_URL}${BUSINESS_PATH}`
const TITLE =
  'For Business - OBS Stadium Game for Teams & Sponsors | OverBoard Sports'
const DESCRIPTION =
  'The OBS Stadium Game is a team- and sponsor-branded live-event fan engagement activation. Fans play a 3x3 bingo board against the live game and win sponsor prizes. Book a personalized demo.'
const OG_IMAGE = `${SITE_URL}/OB-rebrand.png`

export default function Business() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CANONICAL} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverBoard Sports" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@OverBoardSports" />
        <meta name="twitter:url" content={CANONICAL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <main id="business" className={styles['page']}>
        <BusinessHero />
        <LinearGradient height="4px" />
        {/* Each section draws its own bottom separator (BusinessSection). */}
        <Partners />
        <Benefits />
        <FanJourney />
        <SponsorActivation />
        <DataPerformance />
        <Faq />
        <FinalCta />
      </main>
    </>
  )
}
