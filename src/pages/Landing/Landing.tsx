import { Helmet } from 'react-helmet-async'
import styles from './styles.module.css'
import { useEffect, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'
import Hero from './Components/Hero'
import TickerTape from 'ui/TickerTape'
import LinearGradient from 'ui/LinearGradient'
import LoadingFallback from 'components/LoadingFallback/LoadingFallback'
import FourEasySteps from './Components/FourEasySteps'
import Testmonial from './Components/Testmonial'

// Lazy load below-the-fold components for better performance
const NewWayToPlay = React.lazy(() => import('./Components/NewWayToPlay'))
const Social = React.lazy(() => import('./Components/Social'))
const Map = React.lazy(() => import('./Components/Map'))

export default function Landing() {
  useEffect(() => {
    // CRITICAL: Keep header visible immediately, defer heavy animations
    gsap.registerPlugin(ScrollTrigger)

    // Immediate: Show header (critical for UX)
    gsap.from('header', {
      opacity: 1,
      duration: 0.8,
      ease: 'expo.inOut',
      delay: 0.1,
    })

    const initializeAnimations = () => {
      // Phase 2: Hero animations (after LCP paints)
      gsap.from('#hero-title, #hero-text, #hero-cta', {
        y: 15,
        opacity: 0,
        ease: 'expo.inOut',
        duration: 1,
        delay: 0.1,
        stagger: 0.05,
        transformOrigin: 'top left',
      })

      // Phase 3: Non-critical animations
      setupNonCriticalAnimations()
    }

    // Cleanup function
    let ctx: gsap.Context

    const setupNonCriticalAnimations = () => {
      ctx = gsap.context(() => {

        // Trophy floating animation
        const trophyElement = document.querySelector('[class*="trophy-icon"]')
        if (trophyElement) {
          gsap.to(trophyElement, {
            y: -10,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
          })
        }

        // Scroll-triggered animations
        const fadeInSections = document.getElementsByClassName('fade-in')
        for (let s of fadeInSections) {
          gsap.from(s, {
            opacity: 0,
            y: 25,
            scrollTrigger: {
              trigger: s,
              start: '150px bottom',
              toggleActions: 'restart none none reverse',
            },
            duration: 1,
            ease: 'expo.out',
          })
        }
      })
    }

    // Defer initialization until browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        initializeAnimations()
      })
    } else {
      // Fallback - still defer significantly
      setTimeout(initializeAnimations, 200)
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>OverBoard Sports - Social Sports Betting & Parlay Bingo</title>
        <meta
          name="description"
          content="Join live sports contests with friends at bars and venues. Fill out parlay bingo cards and compete for cash prizes. Download the OverBoard Sports app today!"
        />
        <meta
          name="keywords"
          content="sports betting, parlay bingo, social betting, sports contests, bar games, live sports, cash prizes"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://overboardsports.com/" />
        <meta
          property="og:title"
          content="OverBoard Sports - Social Sports Betting & Parlay Bingo"
        />
        <meta
          property="og:description"
          content="Join live sports contests with friends at bars and venues. Fill out parlay bingo cards and compete for cash prizes."
        />
        <meta
          property="og:image"
          content="https://overboardsports.com/OB-rebrand.png"
        />

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://overboardsports.com/" />
        <meta
          property="twitter:title"
          content="OverBoard Sports - Social Sports Betting & Parlay Bingo"
        />
        <meta
          property="twitter:description"
          content="Join live sports contests with friends at bars and venues. Fill out parlay bingo cards and compete for cash prizes."
        />
        <meta
          property="twitter:image"
          content="https://overboardsports.com/OB-rebrand.png"
        />

        {/* Just some website tags */}
        <meta name="author" content="OverBoard Sports" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://overboardsports.com/" />
      </Helmet>

      <main id={styles['landing']}>
        {/* Above-the-fold content - loads immediately */}
        <Hero />
        <TickerTape />

        <Suspense
          fallback={
            <LoadingFallback height="400px" message="Loading features..." />
          }
        >
          <div id="about-us">
            <NewWayToPlay />
          </div>
        </Suspense>

        <LinearGradient height="4px" />

        <Suspense
          fallback={
            <LoadingFallback
              height="500px"
              message="Loading social features..."
            />
          }
        >
          <div id="social-features">
            <Social />
          </div>
        </Suspense>

        <LinearGradient height="4px" />

        <Suspense
          fallback={
            <LoadingFallback height="500px" message="Loading testimonials..." />
          }
        >
          <div id="how-to-play">
            <FourEasySteps />
          </div>
        </Suspense>

        <LinearGradient height="4px" />
        <Suspense
          fallback={
            <LoadingFallback height="500px" message="Loading how to play..." />
          }
        >
          <div id="where-to-play">
            <Map />
          </div>
        </Suspense>
        <LinearGradient height="4px" />
        <Suspense
          fallback={
            <LoadingFallback height="500px" message="Loading how to play..." />
          }
        >
          <div id="contact">
            <Testmonial />
          </div>
        </Suspense>
      </main>
    </>
  )
}
