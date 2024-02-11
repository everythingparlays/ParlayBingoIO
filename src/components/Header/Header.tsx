import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link, NavLink, useLocation } from 'react-router-dom'
import download from '/assets/svg/download.svg'
import React from 'react'

export default function Header() {
  const [expanded, setExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close the header links any time the user changes page
  useEffect(() => {
    setExpanded(false)

    if(location.pathname !== '/') {
      document.onscroll = null
      setScrolled(true)
      return
    }

    setScrolled(false)
    
    // Only the homepage has a distinction between scrolled and
    // unscrolled header
    document.onscroll = () => {
      if(document.documentElement.scrollTop > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
  }, [location.pathname])

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default NavLink behavior
    window.open('https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403', '_blank', 'noopener,noreferrer');
  };

  return (
    <header 
      id={styles['header']} 
      className={scrolled ? styles['scrolled'] : ''} 
      aria-expanded={expanded}>
      <div id={styles['nav-expanded-bg']} onClick={() => setExpanded(false)} />
      <div className="container split" id={styles['header-inner']}>
        <Link to="/">
          <img
            src='/assets/images/logo.png'
            alt='Parlay Bingo logo'
            height='44px'
          />
        </Link>
        <div>
          <button 
            onClick={() => setExpanded(true)} 
            id={styles['nav-open']}>
            <div></div>
            <div></div>
            <div></div>
          </button>
          <nav id={styles['links']}>
            <button 
              onClick={() => setExpanded(false)} 
              id={styles['nav-close']}>
              <div></div>
              <div></div>
            </button>
            <ul>
              <li>
                <NavLink to="/" className={styles['link']}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/contests" className={styles['link']}>Upcoming events</NavLink>
              </li>
              <li>
                <NavLink to="https://forms.gle/m83d7soVLv4yEm9q9" className={styles['link']}>Host an event</NavLink>
              </li>
              <li>
                <NavLink to="/help-center" className={styles['link']}>Help Center</NavLink>
              </li>
              <li>
                <NavLink to="/download" className="primary">
                  <img src={download} />
                  Download Now
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
