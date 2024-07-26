import styles from './styles.module.css'
import { Link } from "react-router-dom";
import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className='container'>
        <div id={styles['top']}>
          <div id={styles['logo-wrapper']}>
            <img
              src='/assets/images/OB-blue-purple.png'
              alt='OverBoard Sports logo'
              height='44px'
            />
            <p>Live score updates, frequent near-misses, and only over props for a full game engagement experience</p>
          </div>
          <div id={styles['links']}>
            <div className={styles['link-column']}>
              <h2>Social</h2>
              <a href='https://www.linkedin.com/company/everything-parlays/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
              <a href='https://twitter.com/parlaybingo' target='_blank' rel='noopener noreferrer'>X (Twitter)</a>
              <a href='https://instagram.com/parlaybingo' target='_blank' rel='noopener noreferrer'>Instagram</a>
            </div>
            <div className={styles['link-column']}>
              <h2>Contact</h2>
              <a href='mailto:support@everythingparlays.com'>support@everythingparlays.com</a>
            </div>
            <div className={styles['link-column']}>
              <h2>Download</h2>
              <a href='https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403' target='_blank' rel='noopener noreferrer'>AppStore</a>
            </div>
          </div>
        </div>
        <hr />
        <div id={styles['bottom']}>
          <span>Copyright © OverBoard Sports 2024</span>
          <div>
            <Link to='https://www.everythingparlays.com/privacy-policy'>Privacy Policy</Link>
            <Link to='https://www.everythingparlays.com/terms-of-service'>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
