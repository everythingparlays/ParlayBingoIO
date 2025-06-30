import React, { useState } from 'react'
import styles from './Slideshow.module.css'
import Arrow from 'components/svg/Arrow'

interface SlideshowProps {
  images: string[]
  alt?: string
  maxWidth?: string
  minHeight?: string
  className?: string
}

function Slideshow({ images, alt = 'Slideshow image', maxWidth = '400px', minHeight, className }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }

  const goToNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
  }

  return (
    <div className={`${styles['slideshow-container']} ${className || ''}`}>
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
      <img 
        src={images[currentSlide]} 
        alt={`${alt} ${currentSlide + 1}`}
        className={styles['slide-image']}
        style={{ maxWidth, minHeight }}
      />
      {images.length > 1 && (
        <div className={styles['slide-controls']}>
          {images.map((_, index) => (
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