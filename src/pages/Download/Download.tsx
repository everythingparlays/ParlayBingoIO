import { useEffect } from 'react';
import React from 'react';
import { analytics } from '../../App'; // Correctly import analytics as a named export

export default function DownloadPage() {
  useEffect(() => {
    // Extract the referrer from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get('referrer');

    // Track the referrer using Segment
    if (referrer) {
      analytics.track('App Download Redirect', {
        referrer: referrer,
      });
    }

    // Redirect to the App Store
    window.location.href = 'https://apps.apple.com/us/app/parlay-bingo/id1665470403';
    // window.open('https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403', '_blank', 'noopener,noreferrer');
  }, []); // The empty array ensures this effect runs only once after the initial render

  // Render a message while the new tab is being opened
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
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
        Download OverBoard Sports
      </a>
      <p style={{ color: 'grey', marginTop: '10px' }}>
        If the redirect does not work, download the app and retry.
      </p>
    </div>
  );
}