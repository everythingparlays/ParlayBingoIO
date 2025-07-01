import React, { useState, useEffect } from 'react'
import styles from './SlideShow2.module.css'
import { testimonialData } from '../../data/TestimonialData'

interface TestimonialProps {
  id: number
  name: string
  icon: React.ReactElement
  stars: React.ReactElement
  text: string
}

interface SlideShow2Props {
  autoSlide?: boolean
  slideInterval?: number
  className?: string
}

const SlideShow2: React.FC<SlideShow2Props> = ({
  autoSlide = true,
  slideInterval = 5000,
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || testimonialData.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialData.length)
    }, slideInterval)

    return () => clearInterval(timer)
  }, [autoSlide, slideInterval])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const renderTestimonialCard = (testimonial: TestimonialProps) => (
    <div key={testimonial.id} className={styles.testimonialCard}>
      <div className={styles.cardContent}>
        <div className={styles.quoteIcon}>{testimonial.icon}</div>
        <p className={styles.testimonialText}>{testimonial.text}</p>
        <div className={styles.starsContainer}>{testimonial.stars}</div>
        <h4 className={styles.authorName}>{testimonial.name}</h4>
      </div>
    </div>
  )

  if (!testimonialData || testimonialData.length === 0) {
    return null
  }

  return (
    <div className={`${styles.slideshowContainer} ${className || ''}`}>
      <div className={styles.slideWrapper}>
        <div
          className={styles.slideTrack}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonialData.map((slide, slideIndex) => (
            <div key={slideIndex} className={styles.slide}>
              <div className={styles.testimonialGrid}>
                {slide.map((testimonial) => renderTestimonialCard(testimonial))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      {testimonialData.length > 1 && (
        <div className={styles.slideIndicators}>
          {testimonialData.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide ? styles.active : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SlideShow2
