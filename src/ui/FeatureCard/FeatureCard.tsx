import React from 'react'
import styles from './FeatureCard.module.css'

interface FeatureCardProps {
  icon: React.ReactNode
  subtitle: string
  description: string
  className?: string
}

export default function FeatureCard({
  icon,
  subtitle,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`${styles.featureCard} ${className}`}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
