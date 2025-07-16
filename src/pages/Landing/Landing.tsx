import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './styles.module.css'
import download from '/assets/svg/download.svg'
import { useEffect, Suspense } from 'react'
import InfiniteScroller from 'components/InfiniteScroller/InfiniteScroller'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { singleParallax } from 'utils/parallax'
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
        // Parallax animations (not needed for LCP)
        singleParallax({
          element: document.getElementById('person-1'),
          speed: -1.5,
          delay: 0,
        })

        singleParallax({
          element: document.getElementById('person-2'),
          speed: 1,
          delay: 0,
        })

        singleParallax({
          element: document.getElementById('person-3'),
          speed: 1.5,
          delay: 0,
        })

        singleParallax({
          element: document.getElementById('person-4'),
          speed: -2,
          delay: 0,
        })

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

const Testimonials = () => {
  // I recommend at least 12 testimonials for this to look right up to 4K
  const data: TestimonialType[] = [
    {
      name: 'Bar Owner',
      level: 'Chicago',
      text: '"This is exactly what our bar needs to bring customers together, especially on nights with multiple games going on!"',
    },
    {
      name: 'Fantastic User',
      level: 'Chicago',
      text: '"I love how I have the opportunity to parlay from multiple games, takes the experience to the next level."',
    },
    {
      name: 'Bar Owner',
      level: 'Chicago',
      text: '"We struggle during the off season of baseball, and this is something that can keep the crowd year round."',
    },
    {
      name: 'Bar Manager',
      level: 'Chicago',
      text: '"We need more people coming into the bar earlier in the weeknights. These contests are a great way to do that."',
    },
    {
      name: 'Amazing User',
      level: 'User',
      text: '"The originality is what will make this app a success!"',
    },
    {
      name: 'User',
      level: 'User',
      text: '"I’ve never used an app like this and it was pretty intuitive. I appreciate the fun avatars and the ease of use."',
    },
    {
      name: 'User',
      level: 'User',
      text: '"The idea of bingo makes it fun and intriguing, allowing you to enter 9 three way parlays with a way to win without hitting all."',
    },
    {
      name: 'User',
      level: 'User',
      text: '"It was super fun. I liked the live leaderboard and being able to compete against friends was a nice contrast to betting on a regular sportsbook."',
    },
    {
      name: 'App Store Review',
      level: 'User',
      text: '"OverBoard Sports is way more fun and refreshing to use compared to the typical betting apps that are available. Highly Recommend anyone check out the app!"',
    },
  ]

  const elems = data.map((testimonial, index) => {
    return (
      <div key={index} className={styles['testimonial']}>
        <h3>{testimonial.name}</h3>
        <span>{testimonial.level}</span>
        <p>{testimonial.text}</p>
      </div>
    )
  })

  return (
    <section className="fade-in">
      <div className={`container ${styles['centered']}`}>
        <h2 className="section-title" style={{ marginBottom: 'var(--size-7)' }}>
          What people say
          <br />
          about OverBoard Sports
        </h2>
      </div>

      <div className={styles['infinite']}>
        <InfiniteScroller
          elements={elems.slice(0, elems.length / 3)}
          gap={1}
          cycleTime={100000}
        />
        <InfiniteScroller
          elements={elems.slice(elems.length / 3, (2 * elems.length) / 3)}
          gap={1}
          cycleTime={100000}
          invert
        />
        <InfiniteScroller
          elements={elems.slice((2 * elems.length) / 3, elems.length)}
          gap={1}
          cycleTime={100000}
        />
      </div>
    </section>
  )
}
