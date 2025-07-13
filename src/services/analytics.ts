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

export const trackSectionView = (sectionId: string, page: string) => {
  analytics.track('section_viewed', {
    section: sectionId,
    page,
    timestamp: new Date().toISOString(),
  })
}
