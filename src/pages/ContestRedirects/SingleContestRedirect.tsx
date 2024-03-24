import { useEffect } from 'react';
import React from 'react';
import { useParams } from "react-router-dom"

export default function SingleContestRedirectPage() {
    const { id } = useParams()
    const [message, setMessage] = React.useState('Redirecting...')
    const [device, setDevice] = React.useState('')
    useEffect(() => {
            setDevice(navigator.userAgent);
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                window.location.href = `parlaybingo://app/contest?id=${id}&tab=info`;
                const timerId = setTimeout(function () {
                    setMessage('Redirecting you to the App Store...');
                    window.location.href = 'https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403';
                }, 500);
                window.onblur = function () {
                    clearTimeout(timerId);
                };
            }else{
                //window.open('https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403', '_blank', 'noopener,noreferrer');
                //window.location.href = 'https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403';
                setTimeout(() => {
                    setMessage('Redirecting you to the App Store...');
                    window.location.href = 'https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403';
                }, 500);
            }
        }, []);

  // Render a message while the new tab is being opened
  return (
    <>
        <div>{message}</div>
        <div>{device}</div>
    </>
  );
}

