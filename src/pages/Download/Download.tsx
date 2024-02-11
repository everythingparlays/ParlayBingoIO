import { useEffect } from 'react';
import React from 'react';

export default function DownloadPage() {
  useEffect(() => {
    // Open the external URL in a new tab as soon as the component mounts
    window.open('https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403', '_blank', 'noopener,noreferrer');
  }, []); // The empty array ensures this effect runs only once after the initial render

  // Render a message while the new tab is being opened
  return (
    <div>Redirecting you to the App Store...</div>
  );
}