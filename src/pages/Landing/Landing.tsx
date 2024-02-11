import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import download from '/assets/svg/download.svg'
import { useEffect } from 'react'
import InfiniteScroller from 'components/InfiniteScroller/InfiniteScroller'
import gsap from 'gsap'
import { singleParallax } from 'utils/parallax'
import React from 'react'

export default function Landing() {

  useEffect(() => {
    let ctx = gsap.context(() => {

      // Create a bit of parallaxing for the images of people in the social features section
      singleParallax({
        element: document.getElementById('person-1'),
        speed: -1.5,
        delay: 0
      })

      singleParallax({
        element: document.getElementById('person-2'),
        speed: 1,
        delay: 0
      })

      singleParallax({
        element: document.getElementById('person-3'),
        speed: 1.5,
        delay: 0
      })

      singleParallax({
        element: document.getElementById('person-4'),
        speed: -2,
        delay: 0
      })

      gsap.from(
        '#hero-title, #hero-text, #hero-cta',
        {
          y: 15,
          opacity: 0,
          ease: 'expo.inOut',
          duration: 1,
          delay: 0.2,
          stagger: 0.1,
          transformOrigin: 'top left'
        }
      )

      gsap.from(
        'header',
        {
          opacity: 0,
          duration: 1,
          ease: 'expo.inOut',
          delay: 1
        }
      )

      // Make all elements with the class .fade-in fade in and up when they enter the screen
      const fadeInSections = document.getElementsByClassName('fade-in')
      for(let s of fadeInSections) {
        gsap.from(
          s,
          {
            opacity: 0, // start from 0 opacity
            y: 25, // start from 25px down
            scrollTrigger: {
              trigger: s,
              start: '150px bottom', // start animation when the element is 150px from the bottom of the screen
              // restart the animation on entering the start position from the top,
              // reverse the animation when leaving back upwards
              toggleActions: 'restart none none reverse' 
            },
            duration: 1,
            ease: 'expo.out'
          }
        )
      }
    })

    

    return () => ctx.revert()
  }, [])


  return (
    <main id={styles['landing']}>
      <section id={styles['hero']}>
        <div id={styles['hero-inner']} className='container'>
          <h1 id='hero-title'>Competition, Connection and Community</h1>
          <p id='hero-text'>Parlay Bingo is a unique game for all types of sports fans to enjoy by combining the fun of sports betting and the competition and community of fantasy sports. Our goal is for our users to enjoy sports with their friends just as much as we do.</p>
          <Link to='/download' className='primary' id='hero-cta'>
            <img src={download} />
            Download Now
          </Link>
        </div>
      </section>
      <section className={`container ${styles['centered']} ${styles['bg-gradient']} fade-in`}>
        <h2 className='section-title'>Maximized Engagement</h2>
        <p>Live score updates, frequent near-misses, and only over props for a full game engagement experience</p>
        <img 
          src='assets/images/landing/max_engagement.png' 
          alt='Parlay Bingo App'
        />
        <div id={styles['sports-categories']}>
          <span>🏈️️  NFL</span>
          <span>🏀  NBA</span>
          <span>⚾️️  MLB</span>
          <span>🏒️️  NHL</span>
          <span>🎾️️  Tennis</span>
          <span>⚽️️️  Soccer</span>
          <span>⛳️️️️  PGA</span>
        </div>
      </section>
      <section className={`container ${styles['centered']} fade-in`}>
        <h2 className='section-title'>Wider Audience</h2>
        <p id={styles['wider-audience-text']}>Cross sport competitions allow all groups of fans to compete, regardless of the sport</p>
        <div id={styles['wider-audience-images']} className={styles['bg-gradient']}>
          <img 
            src='assets/images/landing/wider_audience_1.png' 
            alt='People cheering at a bar' 
          />
          <img 
            src='assets/images/landing/wider_audience_2.png' 
            alt='People cheering at a bar' 
          />
        </div>
      </section>
      <section className={`container ${styles['centered']} fade-in`} id='social'>
        <h2 className='section-title'>Social Features</h2>
        <p>In-person venues for live weekly contests for any sporting event</p>
        <div id={styles['social-inner']}>
          <div id={styles['small']} className={styles['ring']}></div>
          <div id={styles['med']} className={styles['ring']}></div>
          <div id={styles['large']} className={styles['ring']}></div>
          <img
            src='assets/images/landing/person_1.png'
            alt='Headshot of a person'
            className={styles['social-person']}
            id='person-1'
          />
          <img
            src='assets/images/landing/person_2.png'
            alt='Headshot of a person'
            className={styles['social-person']}
            id='person-2'
          />
          <img
            src='assets/images/landing/person_3.png'
            alt='Headshot of a person'
            className={styles['social-person']}
            id='person-3'
          />
          <img
            src='assets/images/landing/person_4.png'
            alt='Headshot of a person'
            className={styles['social-person']}
            id='person-4'
          />
          <img
            src='assets/images/landing/social_features.png'
            alt='Bar with ping-pong tables'
            id={styles['social-main-img']}
          />
          <div id={styles['social-location']}>
            <div id={styles['social-location-top']}>
              <img
                src='assets/images/landing/social_features.png'
                alt='Location preview'
                id={styles['social-location-preview']}
              />
              <div>
                <h3>102 E Green St STE 104, Champaign, IL 61820</h3>
                <span>Tuesday • 9 PM–2 AM</span>
              </div>
            </div>
            <a href="#" className='secondary'>Get directions</a>
          </div>
        </div>
      </section>
      <Testimonials />
      <section className='container fade-in'>
        <div id={styles['app-store']}>
          <div id={styles['app-store-inner']}>
            <img 
              src='assets/images/landing/qr_code.png' 
              alt='QR Code'
            />
            <h2>Join the fun, download our app!</h2>
            <p>Live score updates, frequent near-misses, and only over props for a full game engagement experience</p>
            <a href='https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403' target='_blank' rel='noopener noreferrer'>
              <img 
                src='assets/images/landing/download_app_store.png' 
                alt='Download on the Apple App Store'
              />
            </a>
          </div>
          <img 
            src='assets/images/landing/app_store_image.png' 
            alt='Pictures of our app'
            id={styles['app-images']}
          />
        </div>
      </section>
    </main>
  )
}

const Testimonials = () => {
  
  // I recommend at least 12 testimonials for this to look right up to 4K
  const data : TestimonialType[] = [
    {
      name: 'Ada Lovelace A',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'
    },
    {
      name: 'Ada Lovelace B',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace C',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace D',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace E',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace F',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace G',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'
    },
    {
      name: 'Ada Lovelace H',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace I',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace J',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace K',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    },
    {
      name: 'Ada Lovelace L',
      level: 'Bingo Strategist',
      text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod ut optio voluptate repellendus laborum."'    
    }
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
    <section className='fade-in'>
      {/*
      <div className={`container ${styles['centered']}`}>
        <h2 className='section-title' style={{marginBottom: 'var(--size-7)'}}>What people say<br />about Parlay Bingo</h2>
      </div>
      
      <div className={styles['infinite']}>
        <InfiniteScroller
          elements={elems.slice(0, elems.length / 3)}
          gap={1}
          cycleTime={100000}
        />
        <InfiniteScroller
          elements={elems.slice(elems.length / 3, 2 * elems.length / 3)}
          gap={1}
          cycleTime={100000}
          invert
        />
        <InfiniteScroller
          elements={elems.slice(2 * elems.length / 3, elems.length)}
          gap={1}
          cycleTime={100000}
        />
      </div>
      */}
    </section>
  )
}
