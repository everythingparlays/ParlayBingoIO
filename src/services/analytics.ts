import { analytics } from '../App'

interface DownloadButtonProps {
  page: string
  location: string
  buttonText?: string
  source?: string
}

interface NavigationProps {
  from: string
  to: string
  method: 'click' | 'scroll' | 'redirect'
}

export const trackDownloadButton = (props: DownloadButtonProps) => {
  analytics.track('download_button_clicked', {
    page: props.page,
    location: props.location,
    button_text: props.buttonText || 'Download the App',
    source: props.source,
    timestamp: new Date().toISOString(),
  })
}

export const trackAppDownloadRedirect = (referrer?: string) => {
  analytics.track('App Download Redirect', {
    referrer,
    user_agent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  })
}

export const trackNavigation = (props: NavigationProps) => {
  analytics.track('navigation', props)
}

interface BusinessCtaProps {
  location: string
  label: string
  href: string
}

/** "For Business" page: a demo-booking CTA was clicked. */
export const trackBusinessCta = (props: BusinessCtaProps) => {
  analytics.track('business_cta_clicked', {
    page: '/business',
    location: props.location,
    button_text: props.label,
    destination: props.href,
    timestamp: new Date().toISOString(),
  })
}

/** "For Business" demo page: a demo was booked through the Cal.com embed. */
export const trackBusinessDemoBooked = () => {
  analytics.track('business_demo_booked', {
    page: '/business/demo',
    timestamp: new Date().toISOString(),
  })
}

/** "For Business" page: an FAQ item was opened or closed. */
export const trackBusinessFaq = (question: string, open: boolean) => {
  analytics.track('business_faq_toggled', {
    page: '/business',
    question,
    open,
    timestamp: new Date().toISOString(),
  })
}

export const trackSectionView = (sectionId: string, page: string) => {
  analytics.track('section_viewed', {
    section: sectionId,
    page,
    timestamp: new Date().toISOString(),
  })
}
