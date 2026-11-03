import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { trackBusinessDemoBooked } from 'services/analytics'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Placeholder from '../components/Placeholder'
import styles from './DemoPage.module.css'
// page tokens + utilities, scoped under #business / #business-demo
import '../components/business-tokens.css'
import {
  BOOKING_LINK,
  BUSINESS_PATH,
  DEMO_PATH,
  SUPPORT_EMAIL,
  isBookingConfigured,
} from '../businessConfig'

// Own chunk, requested only when the calendar actually renders, so no
// booking-provider code loads while BOOKING_LINK is unset.
const BookingEmbed = lazy(() => import('./BookingEmbed'))

const SITE_URL = 'https://overboardsports.com'
const CANONICAL = `${SITE_URL}${DEMO_PATH}`
const TITLE = 'Book a Demo - OBS Stadium Game | OverBoard Sports'
const DESCRIPTION =
  'Book a personalized walkthrough of the OBS Stadium Game with the OBS team, tailored to your team and your sponsors.'
const OG_IMAGE = `${SITE_URL}/OB-rebrand.png`

const EXPECTATION =
  'A short walkthrough with the OBS team, tailored to your team and your sponsors.'

function ChevronLeft() {
  return (
    <svg
      className={styles['chevron']}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 3.5 5.5 8l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BookedPanel() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  // The calendar this replaces may have held focus; move it to the result.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className={styles['booked']} role="status">
      <h2 ref={headingRef} tabIndex={-1} className={styles['booked-title']}>
        You&rsquo;re booked.
      </h2>
      <p className={styles['booked-text']}>
        Check your email for the calendar invite. We&rsquo;ll see you then.
      </p>
      <Link to={BUSINESS_PATH} className={`${styles['booked-link']} biz-focus`}>
        Back to For Business
      </Link>
    </div>
  )
}

function HoldingPanel({ failed = false }: { failed?: boolean }) {
  return (
    <div className={styles['holding']}>
      {failed ? (
        <p className={styles['holding-title']}>The booking calendar didn&rsquo;t load.</p>
      ) : (
        <Placeholder>Booking calendar is being set up</Placeholder>
      )}
      <p className={styles['holding-text']}>
        {failed ? 'You can reach the team at' : 'In the meantime, reach the team at'}{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className={`${styles['mail']} biz-focus`}>
          {SUPPORT_EMAIL}
        </a>
      </p>
    </div>
  )
}

export default function DemoPage() {
  const [booked, setBooked] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const bookedRef = useRef(false)

  // The embed can report one booking more than once; count it once.
  const handleBooked = useCallback(() => {
    if (bookedRef.current) return
    bookedRef.current = true
    trackBusinessDemoBooked()
    setBooked(true)
  }, [])

  const handleReady = useCallback(() => setReady(true), [])
  const handleFailed = useCallback(() => setFailed(true), [])

  const bookingLink = isBookingConfigured() ? BOOKING_LINK : null

  let panel: React.ReactNode
  if (!bookingLink || failed) {
    panel = <HoldingPanel failed={failed} />
  } else if (booked) {
    panel = <BookedPanel />
  } else {
    panel = (
      <Suspense
        fallback={
          <p className={styles['loading']} role="status">
            Loading calendar&hellip;
          </p>
        }
      >
        <BookingEmbed
          link={bookingLink}
          onBooked={handleBooked}
          onReady={handleReady}
          onFailed={handleFailed}
        />
      </Suspense>
    )
  }

  // Reserve the booker's height only until it reports ready; after that the
  // iframe sizes itself and the card hugs it.
  const embedLoading = bookingLink && !booked && !failed && !ready
  const surfaceClass = [
    styles['calendar'],
    embedLoading ? styles['calendar-loading'] : '',
  ]
    .filter(Boolean)
    .join(' ')

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

      <main id="business-demo" className={styles['page']}>
        <div className={`container ${styles['inner']}`}>
          <Link to={BUSINESS_PATH} className={`${styles['back']} biz-focus`}>
            <ChevronLeft />
            Back to For Business
          </Link>

          <SectionHeading
            as="h1"
            id="business-demo-heading"
            title="Book a"
            accent="personalized demo"
            lead={EXPECTATION}
            className={styles['heading']}
          />

          <Card
            tone="surface"
            padding="sm"
            className={surfaceClass}
            aria-label="Booking calendar"
            role="region"
          >
            {panel}
          </Card>
        </div>
      </main>
    </>
  )
}
