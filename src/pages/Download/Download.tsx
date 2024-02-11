import React, { useEffect } from 'react';

// Extend the Navigator type to include the 'standalone' property
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export default function DownloadPage() {
  useEffect(() => {
    const appStoreUrl = 'https://apps.apple.com/us/app/parlay-bingo-fantasy-sports/id1665470403';
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = 'standalone' in window.navigator && window.navigator.standalone;

    if (isIOS && !isInStandaloneMode) {
      window.location.href = appStoreUrl;
    } else {
      window.open(appStoreUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return <div>Redirecting you to the App Store...</div>;
}
