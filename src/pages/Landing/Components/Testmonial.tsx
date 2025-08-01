import React from 'react'
import styles from '../styles/Testimonial.module.css'
import Crown from '../../../components/svg/Crown'
import ChatTestimonial from '../../../components/svg/ChatTestimonial'
import Button from '../../../ui/Button'
import SlideShow2 from '../../../components/Slideshow2/SlideShow2'
import { useNavigate, useLocation } from 'react-router-dom'
import { trackDownloadButton, trackAppDownloadRedirect } from 'services/analytics'

const Testmonial = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <section id="section" className={styles.testmonial}>
      {/* left */}
      <div className={styles.testmonial_left}>
        <div className={styles.testmonial_left_content}>
          <div className={styles.testmonial_title_container}>
            <h1 className={`${styles.testmonial_title} gradient-text`}>
              WHAT PLAYERS
            </h1>
            <h1 className={`${styles.testmonial_title} gradient-text`}>
              ARE SAYING
            </h1>
          </div>

          <p className={styles.testmonial_text}>
            Don't just take our word for it. Here's what real players are saying
            about their OverBoard experience.
          </p>

          <Button
            size="md"
            onClick={() => {
              trackDownloadButton({
                page: location.pathname,
                location: 'testimonials_section',
                buttonText: 'Join These Users Having Fun >',
              })
              const urlParams = new URLSearchParams(window.location.search)
              const referrer = urlParams.get('referrer')
              trackAppDownloadRedirect(referrer)
              navigate('/download')
            }}
            bg="linear-gradient(135deg, #F8AC1C, #E9663A)"
            color="#1D184C"
            hoverBg="linear-gradient(135deg, #E9663A, #F8AC1C)"
            fontSize="1rem"
            fontWeight="700"
          >
            Join These Users Having Fun {'>'}
          </Button>
        </div>

        <div className={styles.testmonial_left_bottom}>
          <Crown width="230" height="230" />
        </div>
      </div>

      {/* right */}
      <div className={styles.testmonial_right}>
        <SlideShow2 autoSlide={true} slideInterval={6000} />
      </div>
    </section>
  )
}

export default Testmonial;
