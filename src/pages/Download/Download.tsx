import { useEffect } from 'react'
import React from 'react'
import { analytics } from '../../App' // Correctly import analytics as a named export
import DownloadButton from 'components/Buttons/DownloadButton'
import ShareButton from 'components/Buttons/ShareButton'
import Button from 'ui/Button'
import {
  trackAppDownloadRedirect,
  trackDownloadButton,
} from 'services/analytics'
import { LinearGradient } from 'ui/LinearGradient'

export default function DownloadPage() {
  const [message, setMessage] = React.useState('Redirecting...')
  const [secondaryMessage, setSecondaryMessage] = React.useState(
    'Taking you to the App Store!'
  )
  const [showTryAgain, setShowTryAgain] = React.useState(true)
  const [device, setDevice] = React.useState('')

  const tryRedirect = () => {
    setDevice(navigator.userAgent)
    setShowTryAgain(false)
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      try {
        window.location.href =
          'https://apps.apple.com/us/app/parlay-bingo/id1665470403'
      } catch (error) {
        console.error(error)
      }
      setTimeout(function () {
        setMessage('Redirect Failed')
        setSecondaryMessage(
          "If the app does not open, click 'Download OverBoard Sports' below"
        )
        setShowTryAgain(true)
      }, 3000)
    } else {
      setTimeout(() => {
        setMessage('Unsupported Device')
        setSecondaryMessage('Only iOS devices are supported at this time.')
        setShowTryAgain(true)
      }, 50)
    }
  }

  useEffect(() => {
    // Extract the referrer from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const referrer = urlParams.get('referrer')

    // Track the referrer using Segment
    if (referrer) {
      analytics.track('App Download Redirect', {
        referrer: referrer,
      })
    }

    tryRedirect()
  }, [])

  const handleTryAgain = () => {
    tryRedirect()
  }

  return (
    <main
      id="main"
      // className="container"
      style={{
        backgroundColor: '#303083',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <h1 style={{ marginBottom: '20px', fontWeight: 'bold', color: 'white' }}>{message}</h1>
      <p style={{ marginBottom: '20px', color: 'white' }}>{secondaryMessage}</p>
      {!/iPad|iPhone|iPod/.test(navigator.userAgent) && (
        <>
          <p
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '20px',
              whiteSpace: 'pre-line',
            }}
          >
            Join our{' '}
            <a
              href="https://forms.gle/LH3Cg4aM5unooJ9o6"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff' }}
            >
              Android Waitlist
            </a>
            , or Download On Another Device Using the QR Code.
          </p>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <img
              src="/assets/images/qr-code-for-download-redirect.png"
              alt="QR code to download the app"
              style={{
                width: 'min(80%, 256px)',
                height: 'auto',
                borderRadius: '10px',
              }} // Rounded corners
            />
            <p
              style={{ color: 'white', marginTop: '10px', marginBottom: '20px' }}
            >
              Scan the QR code to download the app.
            </p>
          </div>
        </>
      )}
      <div style={{}}>
        <Button
          bg="#303083"
          color="white"
          onClick={() => {
            trackDownloadButton({
              page: location.pathname,
              location: 'download_page',
              buttonText: 'Download OverBoard Sports',
            })
            const urlParams = new URLSearchParams(window.location.search)
            const referrer = urlParams.get('referrer')
            trackAppDownloadRedirect(referrer)
            window.location.href =
              'https://apps.apple.com/us/app/parlay-bingo/id1665470403'
          }}
          style={{ border: '2px solid white', borderRadius: '5px' }}
        >
          Download OverBoard Sports
        </Button>
      </div>
      <ShareButton />
      <LinearGradient
        style={{ marginTop: '10rem' }}
      />
    </main>
  )
}
