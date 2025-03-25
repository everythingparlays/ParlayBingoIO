import React from 'react';

interface DownloadButtonProps {
  overrideText?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ overrideText }) => {
  return (
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
      {overrideText || 'Download OverBoard Sports'}
    </a>
  );
};

export default DownloadButton;
