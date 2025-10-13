import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { DeferredDeepLink } from '../../shared-deps/interfaces/DeferredLinking'
// Interface matching DeferredDeepLink requirements
import { baseUrl2 } from '../../utils/constants'
import AppleDownload from 'components/svg/AppleDownload'
import GooglePlayDownload from 'components/svg/GooglePlayDownload'

const App_redirect = () => {
  console.log('App_redirect component is rendering...')
  const [searchParams] = useSearchParams()
  const inAppLink = searchParams.get('in_app_link')

  const [deferredLinkData, setDeferredLinkData] =
    useState<DeferredDeepLink | null>(null)
  const [ipLoading, setIpLoading] = useState(true)
  const [appRedirectAttempted, setAppRedirectAttempted] = useState(false)
  const hasStoredDataRef = useRef(false) // Use ref instead of state to prevent duplicate storage

  useEffect(() => {
    // Prevent duplicate execution using ref
    if (hasStoredDataRef.current || !inAppLink) {
      console.log(
        'Skipping data capture - already stored or missing in_app_link param'
      )
      return
    }

    console.log('useEffect triggered, starting link data capture...')
    console.log('Received in_app_link:', inAppLink)

    // Set the ref immediately to prevent duplicate execution
    hasStoredDataRef.current = true

    const captureLinkData = async () => {
      try {
        // Parse the deep link URL to extract parameters
        const parsedDeepLink = parseDeepLinkUrl(inAppLink)

        const userIP = await getPublicIP()
        setIpLoading(false)

        const deferredData: DeferredDeepLink = {
          userIP: userIP,
          userAgent: navigator.userAgent,
          timestamp: new Date(),
          status: 'pending',
          baseUrl: window.location.origin + '/app_redirect',
          linkType: parsedDeepLink.linkType,
          urlParameters: parsedDeepLink.urlParameters,
          deepLinkUrl: inAppLink,
        }

        setDeferredLinkData(deferredData)
        console.log('Generic Link Data:', deferredData)

        // Store the deferred link data to backend
        try {
          await storeDeepLink(deferredData)
          console.log('Successfully stored deferred link to backend')
        } catch (error) {
          console.error('Failed to store deferred link:', error)
          // Reset ref on failure to allow retry
          hasStoredDataRef.current = false
        }

        // Temporarily disabled for testing
        // attemptAppRedirect(inAppLink)
      } catch (error) {
        console.error('Error capturing link data:', error)
        setIpLoading(false)
        // Reset ref on error to allow retry
        hasStoredDataRef.current = false
      }
    }

    captureLinkData()
  }, [inAppLink]) // Re-run if inAppLink changes

  // useEffect(() => {
  //   if (!inAppLink) {
  //     window.location.href = '/download'
  //   }
  //   return
  // }, [inAppLink])

  // Parse deep link URL to extract link type and parameters
  const parseDeepLinkUrl = (
    deepLink: string
  ): { linkType: string; urlParameters: Record<string, string> } => {
    try {
      const url = new URL(deepLink)
      const params = new URLSearchParams(url.search)
      const urlParameters: Record<string, string> = {}

      // Extract query parameters
      params.forEach((value, key) => {
        urlParameters[key] = value
      })

      // Extract link type from the first segment of the in_app_link
      // e.g., for example "parlaybingo://app/contest?type=referral&referral_code=ABC123" → "app/contest"
      const linkType =
        params.get('type') ||
        url.pathname.split('/').filter(Boolean)[0] ||
        'unknown'

      return { linkType, urlParameters }
    } catch (error) {
      console.error('Failed to parse deep link:', error)
      return { linkType: 'unknown', urlParameters: {} }
    }
  }

  const storeDeepLink = async (deepLink: DeferredDeepLink) => {
    const response = await axios.post(`${baseUrl2}/deferred-link`, deepLink)
    console.log('Deferred link stored:', response.data)
  }

  const attemptAppRedirect = (deepLinkUrl: string) => {
    if (appRedirectAttempted) {
      console.log('App redirect already attempted, skipping')
      return
    }
    setAppRedirectAttempted(true)

    const platform = detectPlatform()

    console.log(' === DEEP LINK REDIRECT STARTING ===')
    console.log('Platform Detected:', platform)
    console.log('Deep Link URL:', deepLinkUrl)
    console.log('Start Time:', new Date().toISOString())
    console.log('User Agent:', navigator.userAgent)

    // Detect if user left the page (app opened successfully)
    let appOpened = false
    const startTime = Date.now()

    const handleVisibilityChange = () => {
      const elapsed = Date.now() - startTime
      if (document.hidden && elapsed > 300) {
        console.log(`👁️ Page hidden after ${elapsed}ms - app likely opened`)
        appOpened = true
      }
    }

    // Listen for any errors that might occur when trying to open the deep link
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message?.toLowerCase() || ''
      console.log(' Error detected:', event.message)

      if (
        errorMessage.includes('scheme') ||
        errorMessage.includes('handler') ||
        errorMessage.includes('launch')
      ) {
        console.log(
          '**** Deep link scheme error detected - immediately redirecting to app store'
        )
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('error', handleError)
        redirectToAppStore(platform)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('error', handleError)
    console.log('✅ Event listeners attached')

    // Create a hidden iframe to attempt the deep link
    console.log('📄 Creating hidden iframe for deep link attempt...')
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = deepLinkUrl
    document.body.appendChild(iframe)
    console.log('Iframe created and appended to body')

    // Clean up the iframe after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe)
      console.log('Iframe cleaned up after 1 second')
    }, 1000)

    // Also try window.location for all devices
    setTimeout(() => {
      console.log('Attempting window.location.href redirect (500ms delay)')
      try {
        window.location.href = deepLinkUrl
      } catch (error) {
        console.log(' Exception caught trying to launch deep link:', error)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('error', handleError)
        redirectToAppStore(platform)
      }
    }, 500)

    // If app didn't open after 1.5 seconds, redirect to app store
    setTimeout(() => {
      console.log('=== 1.5 SECOND TIMEOUT REACHED ===')
      console.log('App Opened Status:', appOpened)
      console.log('Time Elapsed:', Date.now() - startTime, 'ms')

      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('error', handleError)
      console.log(' Event listeners removed')

      // Check if app opened or if user is still on page
      if (!appOpened) {
        console.log(' App did NOT open - triggering app store fallback')
        console.log('🏪 Redirecting to:', platform, 'app store')
        redirectToAppStore(platform)
      } else {
        console.log(
          ' App appears to have opened successfully - no redirect needed'
        )
      }
    }, 1500)
  }

  const isMobileDevice = (): boolean => {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  const detectPlatform = (): 'ios' | 'android' => {
    const userAgent = navigator.userAgent.toLowerCase()
    console.log('🔍 User Agent:', userAgent)
    // Check for all Apple devices: iPhone, iPad, iPod, Mac, Macintosh
    if (/iphone|ipad|ipod|macintosh|mac os x/.test(userAgent)) {
      console.log(' Platform detected: iOS/Apple')
      return 'ios'
    }
    console.log('🤖 Platform detected: Android (default)')
    return 'android'
  }

  const redirectToAppStore = (platform: 'ios' | 'android') => {
    const urls = {
      ios: 'https://apps.apple.com/us/app/overboard-sports/id1665470403',
      android:
        'https://docs.google.com/forms/d/1Rxwi9b8uKDTDZ2JcKnUrWLbTItRA6WZHWnE77X57kd0/viewform?edit_requested=true',
    }
    console.log('=== REDIRECTING TO APP STORE ===')
    console.log('Platform:', platform)
    console.log('Store URL:', urls[platform])
    console.log('Redirect Time:', new Date().toISOString())
    window.location.href = urls[platform]
  }

  const getPublicIP = async (): Promise<string> => {
    try {
      // Try multiple IP services as fallbacks
      const ipServices = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://jsonip.com',
        'https://api.my-ip.io/ip.json',
      ]

      for (const service of ipServices) {
        try {
          const response = await fetch(service, {
            method: 'GET',
            timeout: 5000,
          } as any)
          const data = await response.json()

          // Handle different response formats
          const ip = data.ip || data.query || data.IPv4 || data.origin
          if (ip && isValidIP(ip)) {
            return ip
          }
        } catch (serviceError) {
          console.warn(`Failed to get IP from ${service}:`, serviceError)
          continue
        }
      }

      throw new Error('All IP services failed')
    } catch (error) {
      console.warn('Could not retrieve public IP:', error)
      return 'unavailable'
    }
  }

  const isValidIP = (ip: string): boolean => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipRegex.test(ip)
  }

  const getAppStoreUrl = (platform: 'ios' | 'android'): string => {
    const urls = {
      ios: 'https://apps.apple.com/us/app/overboard-sports/id1665470403',
      android:
        'https://docs.google.com/forms/d/1Rxwi9b8uKDTDZ2JcKnUrWLbTItRA6WZHWnE77X57kd0/viewform?edit_requested=true',
    }
    return urls[platform]
  }

  const getLinkTypeDisplay = (linkType: string): string => {
    const displayMap: Record<string, string> = {
      referral: 'Referral',
      contest: 'Contest',
      marketing: 'Marketing Campaign',
      promo: 'Promotion',
      invite: 'Invitation',
      settings: 'Settings',
      profile: 'Profile',
      board: 'Board',
      leaderboard: 'Leaderboard',
    }
    return displayMap[linkType] || 'App'
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #303083 0%, #1e1e5a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:
          'var(--font-main)',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '450px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '48px 36px',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
        }}
      >
        {ipLoading && !deferredLinkData ? (
          <div>
            <div
              style={{
                width: '60px',
                height: '60px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #303083',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 24px',
              }}
            />
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
            <h2
              style={{
                color: '#333',
                marginBottom: '12px',
                fontSize: '22px',
                fontWeight: '600',
              }}
            >
              Processing Your Link...
            </h2>
            <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>
              Please wait while we prepare your access
            </p>
          </div>
        ) : (
          <div>
            <div
              style={{
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={`/public/OB-rebrand.png`}
                alt="Overboard Sports"
                style={{
                  height: window.innerWidth <= 768 ? '70px' : '120px',
                  width: 'auto',
                  maxWidth: '100%',
                }}
              />
            </div>
            <h1
              style={{
                color: '#1a1a1a',
                marginBottom: '16px',
                fontSize: '26px',
                fontWeight: '700',
                letterSpacing: '-0.5px',
              }}
            >
              Welcome to Overboard Sports!
            </h1>
            <p
              style={{
                color: '#666',
                marginBottom: '12px',
                fontSize: '17px',
                fontWeight: '500',
              }}
            >
              {getLinkTypeDisplay(deferredLinkData?.linkType || '')} Link
            </p>
            {deferredLinkData?.urlParameters &&
              Object.keys(deferredLinkData.urlParameters).length > 0 && (
                <div
                  style={{
                    background: '#f8f9fa',
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    marginTop: '16px',
                  }}
                >
                  {Object.entries(deferredLinkData.urlParameters).map(
                    ([key, value]) => (
                      <p
                        key={key}
                        style={{
                          color: '#555',
                          fontSize: '16px',
                          margin: '6px 0',
                          lineHeight: '1.5',
                        }}
                      >
                        <span
                          style={{ color: '#888', textTransform: 'capitalize' }}
                        >
                          {key}:
                        </span>{' '}
                        <strong style={{ color: '#303083' }}>{value}</strong>
                      </p>
                    )
                  )}
                </div>
              )}

            {appRedirectAttempted && (
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: '1px solid #c3e6cb',
                }}
              >
                <p
                  style={{
                    color: '#155724',
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: '500',
                  }}
                >
                  Opening Overboard Sports app...
                </p>
              </div>
            )}

            <p
              style={{
                color: '#777',
                marginBottom: '32px',
                fontSize: '15px',
                lineHeight: '1.6',
              }}
            >
              If the app didn't open automatically, download it below:
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <a
                href={getAppStoreUrl('ios')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <AppleDownload width={180} height={54} />
              </a>
              <a
                href={getAppStoreUrl('android')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <GooglePlayDownload width={180} height={54} />
              </a>
            </div>

            {/* {deferredLinkData && (
							<button
								onClick={() =>
									attemptAppRedirect(deferredLinkData.deepLinkUrl)
								}
								style={{
									background: "#667eea",
									color: "white",
									border: "none",
									padding: "12px 24px",
									borderRadius: "10px",
									cursor: "pointer",
									fontSize: "14px",
									width: "100%",
								}}
							>
								Try Opening App Again
							</button>
						)} */}

            {/* Debug info for development */}
            {/* {process.env.NODE_ENV === "development" && deferredLinkData && (
							<details style={{ marginTop: "20px", textAlign: "left" }}>
								<summary style={{ cursor: "pointer", color: "#666" }}>
									Debug Info
								</summary>
								<pre
									style={{
										fontSize: "10px",
										background: "#f5f5f5",
										padding: "10px",
										borderRadius: "5px",
										overflow: "auto",
										marginTop: "10px",
									}}
								>
									{JSON.stringify(deferredLinkData, null, 2)}
								</pre>
							</details>
						)} */}
          </div>
        )}
      </div>
    </div>
  )
}

export default App_redirect
