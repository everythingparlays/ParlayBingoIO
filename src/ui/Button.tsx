import React from 'react'
import styles from './styles/Button.module.css'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
  bg?: string
  color?: string
  hoverBg?: string
  hoverColor?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      className,
      children,
      bg,
      color,
      hoverBg,
      hoverColor,
      style,
      ...props
    },
    ref
  ) => {
    const buttonStyle = {
      background: bg,
      color: color,
      '--hover-bg': hoverBg,
      '--hover-color': hoverColor,
      ...style,
    } as React.CSSProperties & {
      '--hover-bg'?: string
      '--hover-color'?: string
    }

    const buttonClasses = [
      styles.button,
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        style={buttonStyle}
        {...props}
      >
        {loading ? 'Loading...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
