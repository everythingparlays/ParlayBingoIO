import React from 'react'
import styles from '../styles/FourEasySteps.module.css'
import Button from 'ui/Button'
import { useNavigate } from 'react-router-dom'
import DashedLine from 'components/svg/DashedLine'
import { stepsToPlay } from 'data/StepsToPlay'
import Card from 'ui/Card/Card'
type Props = {}

function FourEasySteps({}: Props) {
  const navigate = useNavigate()
  return (
    <section id={styles.section}>
      {/*Titles and descriptions */}
      <div className={styles['container-top']}>
        <div className={styles['titles-container']}>
          <h1 className="gradient-text">4 Easy Steps</h1>
          <h1 className="gradient-text">To PLAY</h1>
          <div>
            <DashedLine height={4} />
          </div>
        </div>
        <div className={styles['container-top-right']}>
          <p style={{ color: 'white', fontSize: 'var(--font-size-lg)' }}>
            We give you a quick overview of how to play the game here, but you
            can see even more details to the right.
          </p>
          <div className={styles['buttons-container']}>
            <Button
              size="md"
              onClick={() => {
                navigate('/download')
              }}
              bg="var(--secondary-cta)"
              color="var(--primary)"
              hoverBg="var(--secondary-cta)"
            >
              Get Started
            </Button>
            <Button
              size="md"
              bg="var(--primary)"
              color="white"
              hoverBg="linear-gradient(135deg, #E9663A, #F8AC1C)"
              style={{ border: '1px solid' }}
              onClick={() => {
                navigate('/download')
              }}
            >
              Create a Free Board
            </Button>
          </div>
        </div>
      </div>
      {/*Steps Content */}
      <div className={styles['content-container']}>
        {stepsToPlay.map((step) => (
          <Card key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}

export default FourEasySteps
