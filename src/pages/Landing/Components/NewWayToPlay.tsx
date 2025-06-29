import React from 'react'
import ThreeInARowBonus from 'components/svg/ThreeInARowBonus';
import ThreeInARowBonusPhone from 'components/svg/ThreeInARowBonusPhone';
import styles from "../styles/NewWayToPlay.module.css"
impo
type Props = {}

function NewWayToPlay({}: Props) {
  return (
    <section id={styles['section']}>
      {/* Left side */}
      <div>
        {/* SVG stuff */}
        <div>
          <ThreeInARowBonus/>
          <ThreeInARowBonusPhone/>
        </div>
        {/* Text */}
        <div>
          <h1>
            A NEW WAY TO PLAY
          </h1>
          <p>
            Introducing parlay bingo: A contest based
            game where you can arrange picks in a 3x3
            board and earn points
          </p>
        </div>
        {/*Download app button*/}
        <div>
          <Button/>
        </div>
      </div>
      {/* Right side */}
      <div>
        {/* title */}
        <div></div>
        {/*break line*/}
        <div></div>
        {/* description */}
        <div></div>
        <div></div>
      </div>

    </section>
  )
}

export default NewWayToPlay;