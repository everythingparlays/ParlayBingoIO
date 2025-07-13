import React from 'react';

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'OverBoard Sports',
          text: 'Check out OverBoard Sports!',
          url: 'https://apps.apple.com/us/app/parlay-bingo/id1665470403',
          
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <button
      onClick={handleShare}
      style={{
        display: 'inline-block',
        backgroundColor: '#D9EEFB',
        color: '#303083',
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '20px',
        cursor: 'pointer',
      }}
    >
      Share OverBoard Sports
    </button>
  );
};

export default ShareButton;
