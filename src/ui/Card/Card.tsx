import React from 'react'
import styles from './Card.module.css'
type Props = {
  image: string
  title: string
  description: string
}



function Card({image, title, description}: Props) {
  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles['image-container']}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles['content-container']}>
        {/* Title and description */}
        <div className={styles['title-container']}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card