import React from 'react'
import styles from './Card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** surface = --biz-surface fill + hairline border; outline = transparent fill + hairline border. */
  tone?: 'surface' | 'outline'
  padding?: 'sm' | 'md' | 'lg'
  /** md = --biz-radius-sm (12px), lg = --biz-radius (20px). */
  radius?: 'md' | 'lg'
  /** Element to render (e.g. "li", "article", "figure"). Default "div". */
  as?: keyof JSX.IntrinsicElements
  /** Lighten the border on hover / focus-within. No movement, no shadow change. */
  interactive?: boolean
  children?: React.ReactNode
}

/**
 * Surface primitive for partner cards, benefit cards, stat tiles,
 * dashboard tiles and FAQ items. Any other HTML attributes (id, style,
 * aria-*) pass through to the rendered element.
 */
export default function Card({
  tone = 'surface',
  padding = 'md',
  radius = 'lg',
  as = 'div',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  const Tag = as as React.ElementType
  return (
    <Tag
      {...rest}
      className={[
        styles['card'],
        styles[tone],
        styles[`pad-${padding}`],
        styles[`radius-${radius}`],
        interactive ? styles['interactive'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
