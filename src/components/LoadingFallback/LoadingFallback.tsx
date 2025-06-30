import React from 'react'
import styles from './LoadingFallback.module.css'

interface LoadingFallbackProps {
  height?: string
  message?: string
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  height = '300px', 
  message = 'Loading...' 
}) => {
  return (
    <div className={styles.container} style={{ minHeight: height }}>
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.message} aria-live="polite">
        {message}
      </span>
    </div>
  )
}

export default LoadingFallback