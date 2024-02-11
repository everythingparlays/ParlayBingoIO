import React from 'react';

export default function DownloadPage() {
  // Call this function to redirect to an external URL
  function handleRedirect() {
    window.location.href = 'https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403';
  }

  // Invoke `handleRedirect` where appropriate, for example, on a button click
  return (
    <div>
      <button onClick={handleRedirect}>Download Now</button>
    </div>
  );
}

