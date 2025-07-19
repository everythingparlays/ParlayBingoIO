import React, { useState, useRef, useEffect } from 'react'
import styles from './Slideshow.module.css'
import Arrow from 'components/svg/Arrow'

interface SlideshowProps {
  images: string[] | { webp: string; fallback: string }[]
  alt?: string
  maxWidth?: string
  minHeight?: string
  className?: string
  autoSlide?: boolean
  slideInterval?: number
}

function Slideshow({ images, alt = 'Slideshow image', maxWidth = '400px', minHeight, className, autoSlide = false, slideInterval = 3000 }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const minSwipeDistance = 50

  if (!images || images.length === 0) {
    return null
  }

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, slideInterval)

    return () => clearInterval(timer)
  }, [autoSlide, slideInterval, images.length])

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }

  const goToNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
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

  return (
    <div 
      className={`${styles['slideshow-container']} ${className || ''}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button 
        className={styles['slide-show-arrow-left']} 
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <Arrow />
      </button>
      <button 
        className={styles['slide-show-arrow-right']} 
        onClick={goToNext}
        aria-label="Next slide"
      >
        <Arrow />
      </button>
      {typeof images[0] === 'string' ? (
        <img 
          src={images[currentSlide] as string} 
          alt={`${alt} ${currentSlide + 1}`}
          className={styles['slide-image']}
          style={{ maxWidth, minHeight }}
          loading="lazy"
        />
      ) : (
        <picture>
          <source 
            srcSet={(images[currentSlide] as { webp: string; fallback: string }).webp} 
            type="image/webp" 
          />
          <img 
            src={(images[currentSlide] as { webp: string; fallback: string }).fallback}
            alt={`${alt} ${currentSlide + 1}`}
            className={styles['slide-image']}
            style={{ maxWidth, minHeight }}
            loading="lazy"
          />
        </picture>
      )}
      {images.length > 1 && (
        <div className={styles['slide-controls']}>
          {images.map((_: any, index: number) => (
            <button
              key={index}
              className={`${styles['slide-button']} ${index === currentSlide ? styles['active'] : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Slideshow