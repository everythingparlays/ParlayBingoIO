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
    const tryRedirectSendToAppStoreOtherwise = async () => {
        setDevice(navigator.userAgent);
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            window.location.href = `parlaybingo://app/contest?id=${id}&tab=info`;
            const timerId = setTimeout(function () {
                setMessage('Redirecting you to the App Store...');
                window.location.href = 'https://apps.apple.com/us/app/parlay-bingo/id1665470403';
            }, 100);
            window.onblur = function () {
                clearTimeout(timerId);
            };
        }else{
            //window.open('https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403', '_blank', 'noopener,noreferrer');
            //window.location.href = 'https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403';
            setTimeout(() => {
                setMessage('Redirecting you to the App Store...');
                window.location.href = 'https://apps.apple.com/us/app/parlay-bingo/id1665470403';
            }, 100);
        }
    }

    useEffect(() => {
            if(id){
                axios.get(`${baseUrl}/contest?id=${id}`)
                    .then(response => {
                        if((response.data) && (response.data.contestName)){
                            let contestName = response.data.contestName;
                            document.title = contestName;
                            console.log(response.data);
                            tryRedirectSendToAppStoreOtherwise();
                        }else{
                            setMessage('Contest not found');
                        }
                    })
                    .catch(error => {
                    // Handle the error here
                    console.error(error);
                    });

            }
        }, [id]);

  // Render a message while the new tab is being opened
  return (
    <>
        <div>{message}</div>
        <div>{device}</div>
    </>
  );
}

