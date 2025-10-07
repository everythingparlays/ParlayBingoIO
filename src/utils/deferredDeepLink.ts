export const generateDeepLinkUrl = (
  path: string,
  queryParams?: Record<string, string>
): string => {
  const baseDeepLink = 'parlaybingo://app'

  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // Build query string if params exist
  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(queryParams).toString()
    return `${baseDeepLink}${cleanPath}?${queryString}`
  }

  return `${baseDeepLink}${cleanPath}`
}


/**
 * 
 * @param deepLinkUrl 
 * @returns a string of the html for the app redirect page


 * 
 */
export const generateShareableLink = (deepLinkUrl: string): string => {
  const encodedDeepLink = encodeURIComponent(deepLinkUrl)
  return `https://overboardsports.com/Download_new?in_app_link=${encodedDeepLink}`
}


export const generateAppRedirectPage = (deepLinkUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Opening App...</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <script>
        // Enhanced device fingerprinting
        const deviceFingerprint = {
          screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
          },
          navigator: {
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
            maxTouchPoints: navigator.maxTouchPoints
          },
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: new Date().toISOString()
        };
        
        // Send fingerprint data to your backend
        fetch('/api/device-fingerprint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(deviceFingerprint)
        }).catch(err => console.log('Fingerprint tracking failed:', err));
        
        // Try to open the app
        window.location.href = '${deepLinkUrl}';
        
        // Fallback: redirect to app store after delay
        setTimeout(() => {
          window.location.href = 'https://apps.apple.com/app/parlay-bingo';
        }, 2000);
      </script>
      
      <div style="text-align: center; padding: 50px;">
        <h2>Opening Parlay Bingo...</h2>
        <p>If the app doesn't open automatically, <a href="${deepLinkUrl}">click here</a></p>
        <p>Don't have the app? <a href="https://apps.apple.com/app/parlay-bingo">Download it here</a></p>
      </div>
    </body>
    </html>
  `
}
