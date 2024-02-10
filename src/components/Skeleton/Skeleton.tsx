import styles from './Skeleton.module.css'
import React from 'react'

export default function Skeleton(props : SkeletonType & React.CSSProperties) {
  const { backgroundColor, shineColor, borderRadius } = props
  
  return (
    <div 
      className={styles.skeleton}
      style={{ 
        backgroundColor: backgroundColor ? backgroundColor : 'var(--skeleton-color)',
        "--shine-color": shineColor ? shineColor : "var(--skeleton-shine-color)",
        borderRadius: borderRadius ?? "var(--size-2)",
        ...props
      } as React.CSSProperties}
    />
  )
}
