import { baseUrl } from 'App';
import axios from 'axios';
import { useEffect } from 'react';
import React from 'react';
import { useParams } from "react-router-dom"




export default function SingleContestRedirectPage() {
    const { id } = useParams()
    const [message, setMessage] = React.useState('Redirecting...')
    const [device, setDevice] = React.useState('')
    document.title = 'Join Contest - Parlay Bingo'
    /*
    const tryRedirectSendToAppStoreOtherwise = async () => {
        window.location.href = `parlaybingo://app/contest?id=${id}&tab=info`;
        const timerId = setTimeout(function () {
            setMessage('Redirecting you to the App Store...');
            window.location.href = 'https://apps.apple.com/us/app/parlay-bingo/id1665470403';
        }, 600);
        window.onblur = function () {
            clearTimeout(timerId);
        }; 
    }

    useEffect(() => {
        const fetchData = async () => {
          if (id) {
            try {
              const response = await axios.get(`${baseUrl}/contest?id=${id}`);
              if (response.data && response.data.contestName) {
                let contestName = response.data.contestName;
                document.title = contestName;
                console.log(response.data);
                await tryRedirectSendToAppStoreOtherwise();
              } else {
                setMessage('Contest not found');
              }
            } catch (error) {
              // Handle the error here
              console.error(error);
            }
          }
        };
      
        fetchData();
      }, [id]);
    */
      useEffect(() => {
        setDevice(navigator.userAgent);
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            try{
                window.location.href = `parlaybingo://app/contest?id=${id}&tab=info`;
            } catch (error) {
                console.error(error);
            }
            const timerId = setTimeout(function () {
                setMessage('Redirecting you to the App Store...');
                window.location.href = 'https://apps.apple.com/us/app/parlay-bingo/id1665470403';
            }, 50);
            window.onblur = function () {
                clearTimeout(timerId);
            };
        }else{
            //window.open('https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403', '_blank', 'noopener,noreferrer');
            //window.location.href = 'https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403';
            setTimeout(() => {
                setMessage('Redirecting you to the App Store...');
                window.location.href = 'https://apps.apple.com/us/app/parlay-bingo/id1665470403';
            }, 50);
        }
    }, []);


  // Render a message while the new tab is being opened
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>{message}</h1>
      <p>Taking you to your contest</p>
      <a
        href="https://apps.apple.com/us/app/parlay-bingo/id1665470403"
        style={{
          display: 'inline-block',
          backgroundColor: '#007BFF',
          color: 'white',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '5px',
          marginTop: '20px',
        }}
      >
        Download Parlay Bingo
      </a>
      <p style={{ color: 'grey', marginTop: '10px' }}>
        If the redirect does not work, download the app and retry.
      </p>
    </div>
  )
}

