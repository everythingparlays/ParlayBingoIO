import { useState } from 'react'
import styles from './styles.module.css'
import React from 'react'

interface P {
  title: string
}

type Props = React.PropsWithChildren<P>

export default function AccordionItem({ title, children } : Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles['accordion']} aria-expanded={open}>
      <button 
        className={styles['accordion-toggle']}
        onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5 -4.86374e-05L0 4.99995L0.7 5.69995L5 1.39995L9.3 5.69995L10 4.99995L5 -4.86374e-05Z" fill="black"/>
        </svg>
      </button>
      <div className={styles['accordion-content']}>
        {children}
      </div>
    </div>
  )
}
