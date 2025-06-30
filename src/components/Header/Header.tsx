import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import LogoHeader from 'components/svg/LogoHeader'
import LinearGradient from 'ui/LinearGradient'
import Button from 'ui/Button'

export default function Header() {
  const [expanded, setExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Track screen size for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Close the header links any time the user changes page
  useEffect(() => {
    setExpanded(false)

    if (location.pathname !== '/') {
      document.onscroll = null
      setScrolled(true)
      return
    }

    setScrolled(false)

    // Only the homepage has a distinction between scrolled and
    // unscrolled header
    document.onscroll = () => {
      if (document.documentElement.scrollTop > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
  }, [location.pathname])

  return (
    <header
      id={styles['header']}
      className={scrolled ? styles['scrolled'] : ''}
      aria-expanded={expanded}
    >
      <div id={styles['nav-expanded-bg']} onClick={() => setExpanded(false)} />

      {isMobile ? (
        /* Mobile header layout */
        <div className={styles['mobile-header-container']}>
          {/* Left: Burger Menu Button */}
          <div className={styles['mobile-header-inner-left']}>
            <div className={styles['mobile-left']}>
              <button onClick={() => setExpanded(true)} id={styles['nav-open']}>
                <div></div>
                <div></div>
                <div></div>
              </button>
            </div>

            {/* Center: Logo */}
            <div className={styles['mobile-center']}>
              <Link to="/" className={styles['logo-container']}>
                <LogoHeader
                  height={36}
                  width={150}
                  className={styles['logo']}
                />
              </Link>
            </div>
          </div>

          {/* Right: Download Button */}
          <div className={styles['mobile-right']}>
            <Button
              size="sm"
              onClick={() => navigate('/download')}
              bg="#d9eefb"
              color="#303083"
              hoverBg="#c7e6f7"
              hoverColor="#303083"
            >
              Download the App
            </Button>
          </div>
        </div>
      ) : (
        /* Desktop header layout */
        <div className="container split" id={styles['header-inner']}>
          <Link to="/" className={styles['logo-container']}>
            <LogoHeader height={44} width={201} className={styles['logo']} />
          </Link>
          <nav id={styles['desktop-links']}>
            <ul>
              <li>
                <NavLink to="/" className={styles['link']}>
                  How to play
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={styles['link']}>
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={styles['link']}>
                  Contact
                </NavLink>
              </li>
              <li>
                <Button
                  size="sm"
                  onClick={() => navigate('/download')}
                  bg="#d9eefb"
                  color="#303083"
                  hoverBg="#c7e6f7"
                  hoverColor="#303083"
                >
                  Download the App
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Mobile slide-out navigation menu */}
      <nav id={styles['links']} className={isMobile ? '' : styles['hidden']}>
        <button onClick={() => setExpanded(false)} id={styles['nav-close']}>
          <div></div>
          <div></div>
        </button>
        <ul>
          <li>
            <NavLink to="/" className={styles['link']}>
              How to play
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={styles['link']}>
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={styles['link']}>
              Contact
            </NavLink>
          </li>
          <li>
            <Button
              size="sm"
              onClick={() => {
                navigate('/download')
                setExpanded(false)
              }}
              bg="#d9eefb"
              color="#303083"
              hoverBg="#c7e6f7"
              hoverColor="#303083"
            >
              Download the App
            </Button>
          </li>
        </ul>
      </nav>

      <LinearGradient
        height="4px"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 5,
        }}
      />
    </header>
  )
}
