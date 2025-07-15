import gsap from "gsap"

interface ParallaxParams {
  speed: number
  delay: number
}

type SingleParallaxParams = {
  element: HTMLElement | Element | null
} & ParallaxParams

type AllParallaxParams = {
  elements: HTMLCollectionOf<Element> | null
} & ParallaxParams

const SPEED_CONSTANT = 25

export const multiParallax = ({ elements, speed, delay } : AllParallaxParams) => {
  if(elements == null) return
  
  for(let element of elements) {
    singleParallax({ element, speed, delay })
  }
}

export const singleParallax = ({ element, speed, delay } : SingleParallaxParams) => {
  if(element == null) return
  
  return gsap.fromTo(
    element,
    {
      y: SPEED_CONSTANT * speed
    },
    {
      y: -1 * SPEED_CONSTANT * speed,
      scrollTrigger: {
        trigger: element,
        scrub: delay,
        start: 'top bottom',
        // the end should be when the element, after moving from the pseudo-parallax, goes off screen
        // This is the difference between the start and end position
        end: `${-2 * SPEED_CONSTANT * speed}px top`,
      }
    }
  )
}