import { baseUrl } from 'App';
import axios from 'axios';
import { useEffect } from 'react';
import React from 'react';
import { useParams } from "react-router-dom"
import DownloadButton from '../../components/Buttons/DownloadButton'; // Import the new component

export default function SingleContestRedirectPage() {
    const { id } = useParams()
    const [message, setMessage] = React.useState('Redirecting...')
    const [secondaryMessage, setSecondaryMessage] = React.useState('Taking you to your contest!');
    const [showTryAgain, setShowTryAgain] = React.useState(false);
    const [device, setDevice] = React.useState('')

    const tryRedirect = () => {
      setDevice(navigator.userAgent);
      setShowTryAgain(false)
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
          try {
              if (id === '' || id === 'contests') {
                  window.location.href = `parlaybingo://app/contests`;
                  document.title = 'View Contests - OverBoard Sports'
              } else {
                  window.location.href = `parlaybingo://app/contest?id=${id}&tab=info`;
                  document.title = 'Join Contest - OverBoard Sports'
              }
          } catch (error) {
              console.error(error);
          }
          const timerId = setTimeout(function () {
              setMessage('Redirect Failed');
              setSecondaryMessage("If the app does not open, click 'Try Redirect Again' below");
              setShowTryAgain(true);
          }, 5000);
          window.onblur = function () {
              clearTimeout(timerId);
          };
      } else {
          setTimeout(() => {
            setMessage('Unsupported Device');
            setSecondaryMessage('Only iOS devices are supported at this time.');
            setShowTryAgain(true);
              //window.location.href = 'https://apps.apple.com/us/app/parlay-bingo/id1665470403';
          }, 50);
      }
    };

    useEffect(() => {
      tryRedirect();
    }, [id]);

    const handleTryAgain = () => {
        tryRedirect();
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '20px', fontWeight: 'bold' }}>{message}</h1>
            <p style={{ marginBottom: '20px' }}>{secondaryMessage}</p>
            {!/iPad|iPhone|iPod/.test(navigator.userAgent) && (
              <>
              <p style={{ color: 'grey', fontWeight: 'bold', marginBottom: '40px', whiteSpace: 'pre-line' }}>
                  Join our <a href="https://forms.gle/LH3Cg4aM5unooJ9o6" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Android Waitlist</a>, or Download On Another Device Using the QR Code.
              </p>
              
                  <div style={{ marginTop: '20px', marginBottom: '20px' }}>

                      <img
                          src="/assets/images/qr-code-for-download-redirect.png"
                          alt="QR code to download the app"
                          style={{ width: 'min(80%, 256px)', 
                            height: 'auto',  borderRadius: '10px' }} // Rounded corners
                      />
                      <p style={{ color: 'grey', marginTop: '10px', marginBottom: '20px' }}>
                          Scan the QR code to download the app.
                      </p>

                  </div>
                  </>
            )}
            <div>
            {showTryAgain && (
                <button onClick={handleTryAgain} style={{         
                  display: 'inline-block',
                  backgroundColor: '#6c757d', // Changed to grey
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  marginTop: '20px', marginBottom: '20px' }}>
                    Try Redirect Again
                </button>
            )}
            </div>
            <DownloadButton /> {/* Use the new component */}
            <p style={{ color: 'grey', marginTop: '10px', marginBottom: '20px' }}>
                If you do not have the app, download the app and retry 
                
            </p>

        </div>
    )
}

