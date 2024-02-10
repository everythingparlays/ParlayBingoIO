import styles from './styles.module.css'

interface Props {
  elements: React.ReactNode[]
  gap?: number
  invert?: boolean
  cycleTime: number
}

export default function InfiniteScroller({ elements, gap = 0, invert = false, cycleTime }: Props) {
  return (
    <div 
      className={`${styles['scroller']} ${invert ? styles['invert'] : styles['no-invert']}`}
      style={{ '--scroller-gap': `${gap}rem`, '--cycle-time': `${cycleTime}ms` } as React.CSSProperties}>
        <div className={styles['segment']}>
          {elements}
        </div>
        <div className={styles['segment']}>
          {elements}
        </div>
        <div className={styles['segment']}>
          {elements}
        </div>
    </div>
  )
}
