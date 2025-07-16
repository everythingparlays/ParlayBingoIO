import React, { useState, useEffect, useRef } from 'react'
import styles from './SlideShow2.module.css'
import { testimonialData } from '../../data/TestimonialData'
import Arrow from 'components/svg/Arrow'

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
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const minSwipeDistance = 50

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

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? testimonialData.length - 1 : currentSlide - 1)
  }

  const goToNext = () => {
    setCurrentSlide(currentSlide === testimonialData.length - 1 ? 0 : currentSlide + 1)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = 0 // Reset end position
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  const renderTestimonialCard = (testimonial: TestimonialProps) => (
    <div key={testimonial.id} className={styles.testimonialCard}>
      <div className={styles.cardContent}>
        <div className={styles.quoteIcon}>{testimonial.icon}</div>
        <p className={styles.testimonialText}>{testimonial.text}</p>
        <div className={styles.starsContainer}>{testimonial.stars}</div>
        <p className={styles.authorName}>{testimonial.name}</p>
      </div>
    </div>
  )

  if (!testimonialData || testimonialData.length === 0) {
    return null
  }

  return (
    <div className={`${styles.slideshowContainer} ${className || ''}`}>
      {/* Navigation arrows */}
      {testimonialData.length > 1 && (
        <>
          <button 
            className={styles.slideShowArrowLeft} 
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <Arrow />
          </button>
          <button 
            className={styles.slideShowArrowRight} 
            onClick={goToNext}
            aria-label="Next slide"
          >
            <Arrow />
          </button>
        </>
      )}
      
      <div 
        className={styles.slideWrapper}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
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

export default SlideShow2;
