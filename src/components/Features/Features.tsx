import React from 'react'
import FeatureCard from 'ui/FeatureCard/FeatureCard'
import styles from './Features.module.css'
import LeftNewToPlayBlocks from 'components/svg/LeftNewToPlayBlocks'
import RightNewToPlayBlocks from 'components/svg/RightNewToPlayBlocks'

interface Feature {
  icon: React.ReactNode
  subtitle: string
  description: string
}

interface CornerBlocksConfig {
  topLeft?: boolean
  topRight?: boolean
  bottomLeft?: boolean
  bottomRight?: boolean
}

interface FeaturesProps {
  title?: string
  features: Feature[]
  cornerBlocks?: CornerBlocksConfig
  className?: string
}

export default function Features({
  title = "Features",
  features,
  cornerBlocks = {
    topLeft: true,
    topRight: true,
    bottomLeft: false,
    bottomRight: false,
  },
  className = '',
}: FeaturesProps) {
  return (
    <section className={`${styles.featuresSection} ${className}`}>
      <div className="">
        {/* Corner Blocks */}
        {cornerBlocks.topLeft && (
          <div className={styles.cornerBlock} data-corner="top-left">
            <LeftNewToPlayBlocks />
          </div>
        )}
        {cornerBlocks.topRight && (
          <div className={styles.cornerBlock} data-corner="top-right">
            <RightNewToPlayBlocks />
          </div>
        )}
        {cornerBlocks.bottomLeft && (
          <div className={styles.cornerBlock} data-corner="bottom-left">
            <LeftNewToPlayBlocks />
          </div>
        )}
        {cornerBlocks.bottomRight && (
          <div className={styles.cornerBlock} data-corner="bottom-right">
            <RightNewToPlayBlocks />
          </div>
        )}

        {/* Content */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              subtitle={feature.subtitle}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
