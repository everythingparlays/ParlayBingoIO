import { useEffect, useRef, useState, RefObject } from 'react'

interface UseLazyLoadOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseLazyLoadReturn {
  ref: RefObject<HTMLDivElement>
  isIntersecting: boolean
  hasTriggered: boolean
}

/**
 * Custom hook for viewport-based lazy loading using Intersection Observer API
 * Follows performance best practices and provides proper cleanup
 */
export const useLazyLoad = ({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
}: UseLazyLoadOptions = {}): UseLazyLoadReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load immediately if not supported
      setIsIntersecting(true)
      setHasTriggered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible && triggerOnce && !hasTriggered) {
          setHasTriggered(true)
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { ref, isIntersecting, hasTriggered }
}