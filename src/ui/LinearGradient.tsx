import React from 'react'

export type GradientDirection = 'horizontal' | 'vertical' | 'diagonal'

interface LinearGradientProps {
  startColor?: string
  endColor?: string
  direction?: GradientDirection
  height?: string
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const LinearGradient: React.FC<LinearGradientProps> = ({
  startColor = '#db2156',
  endColor = '#f8ac1c',
  direction = 'horizontal',
  height = '8px',
  className = '',
  children,
  style = {},
}) => {
  const getGradientDirection = () => {
    switch (direction) {
      case 'horizontal':
        return 'to right'
      case 'vertical':
        return 'to bottom'
      case 'diagonal':
        return 'to bottom right'
      default:
        return 'to right'
    }
  }

  const gradientStyle: React.CSSProperties = {
    background: `linear-gradient(${getGradientDirection()}, ${startColor}, ${endColor})`,
    width: '100%',
    height,
    ...style,
  }

  return (
    <div className={className} style={gradientStyle}>
      {children}
    </div>
  )
}

export default LinearGradient
