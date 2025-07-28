import React, { useEffect } from 'react'
import gsap from 'gsap'
import DashedLine from 'components/svg/DashedLine'

interface TickerTapeProps {
  line1Text?: string
  line2Text?: string
  speed?: number
}

const tickerTapeData = {
  line1: [
    'COMPETE AGAINST YOUR FRIENDS',
    'CLIMB LEADERBOARDS',
    'LIVE ACTION',
    'WIN BIG PRIZES',
  ],
  line2: [
    'BUILD YOUR BOARD YOUR WAY',
    'PLAY FOR FREE',
    'TONS OF ALTERNATE LINES',
    'REAL TIME UPDATES',
  ],
}

export default function TickerTape({
  speed = 30,
}: Omit<TickerTapeProps, 'line1Text' | 'line2Text'>) {
  const renderTickerContent = (phrases: string[]) => {
    return phrases.map((phrase, index) => (
      <React.Fragment key={index}>
        <span className="ticker-phrase">{phrase}</span>
        {/* Always add separator after each phrase (including the last one) */}
        <span className="ticker-separator">
          <DashedLine width={60} height={4} />
        </span>
      </React.Fragment>
    ))
  }

  const line1Content = Array(3)
    .fill(null)
    .map((_, i) =>
      renderTickerContent(tickerTapeData.line1).map((content, j) => (
        <React.Fragment key={`line1-${i}-${j}`}>{content}</React.Fragment>
      ))
    )
    .flat()

  const line2Content = Array(3)
    .fill(null)
    .map((_, i) =>
      renderTickerContent(tickerTapeData.line2).map((content, j) => (
        <React.Fragment key={`line2-${i}-${j}`}>{content}</React.Fragment>
      ))
    )
    .flat()

  useEffect(() => {
    // Use CSS transforms to avoid forced reflows
    // Use viewport units instead of JavaScript width calculations
    const containerWidth = '100vw'
    const contentWidth = '150vw'

    // Line 1: left to right
    gsap.fromTo(
      '.ticker-line-1',
      { x: `-${contentWidth}` },
      {
        x: `calc(${containerWidth} + 200px)`,
        duration: speed,
        repeat: -1,
        ease: 'none',
      }
    )

    // Line 2: right to left
    gsap.fromTo(
      '.ticker-line-2',
      { x: `calc(${containerWidth} + 200px)` },
      { x: `-${contentWidth}`, duration: speed, repeat: -1, ease: 'none' }
    )

    // Cleanup function
    return () => {
      gsap.killTweensOf('.ticker-line-1')
      gsap.killTweensOf('.ticker-line-2')
    }
  }, [speed])

  return (
    <div className="ticker-container">
      <div className="ticker-line ticker-line-1">{line1Content}</div>
      <div className="ticker-line ticker-line-2">{line2Content}</div>

      <style>{`
        .ticker-container {
          overflow: hidden;
          width: 100%;
          background: var(--primary);
          color: rgba(255, 255, 255, 0.9);
          padding: var(--size-4) 0;
          height: auto;
          min-height: calc(var(--text-3) * 4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--size-2);
          position: relative;
        }
        
        .ticker-container * {
          color: rgba(255, 255, 255, 0.9);
        }

        .ticker-container::before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 50%;
          background-image: url('/TickerImageBackground.webp');
          background-repeat: no-repeat;
          background-position: 70% center;
          background-size: cover;
          background-color: transparent;
          opacity: .7;
          transition: opacity 0.3s ease-in-out;
          mask: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, black 40%);
          -webkit-mask: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, black 40%);
          pointer-events: none;
          z-index: 0;
        }

        .ticker-line {
          display: flex;
          align-items: center;
          white-space: nowrap;
          width: max-content;
          font-size: var(--text-3);
          font-weight: 700;
          font-family: var(--font-secondary);
          letter-spacing: 0.5px;
          height: calc(var(--text-3) * 1.5);
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }
        
        .ticker-phrase {
          margin: 0 var(--size-4);
          font-size: var(--text-3);
          color: rgba(255, 255, 255, 0.9);
        }
        
        .ticker-separator {
          margin: 0 var(--size-3);
          display: flex;
          align-items: center;
        }

        .ticker-line-1 {
          margin-bottom: 0;
        }
        
        .ticker-line-2 {
          margin-top: 0;
        }
      `}</style>
    </div>
  )
}
