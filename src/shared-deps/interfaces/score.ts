import { Board } from "./Board";


export interface AdvancedScore{
  currentScore: number;
  parlaysHit: number;
  maximumScore: number;
  maximumParlays:number;
  remainingParlays: number;
  individualPropTotal: number;
  topRowPoints: number;
  topRowHit: boolean;
  middleRowPoints: number;
  middleRowHit: boolean;
  bottomRowPoints: number;
  bottomRowHit: boolean;
  leftColPoints: number;
  leftColHit: boolean;
  middleColPoints:number;
  middleColHit: boolean;
  rightColPoints:number;
  rightColHit: boolean;
  leftRightDiagPoints: number;
  leftRightDiagHit: boolean;
  rightLeftDiagPoints: number;
  rightLeftDiagHit: boolean;
}

export interface Score{
  maxPossibleScore: number;
  currentScore: number;
  parlaysHit: number;
  remainingParlays: number;
}

const calculateParlayBonus = (multiplierOne: number, multiplierTwo: number, multiplierThree: number): number => {
  if (multiplierOne && multiplierTwo && multiplierThree) {
    return (((multiplierOne + 1 ) * (multiplierTwo + 1 )* (multiplierThree + 1 )) -1) * 100;
  }
  return 0;
}

/************************  SCORING Function For the Backend   *************/

//@deprecated: This is the old way of calculating the score. See calculateScoreNew for the new way.
//Calculate score for the Backend: Adds the score to the board Object
export function calculateScore(boardProp: Board): void {
  let currentScore = 0;
  let maximumScore = 0;
  let parlaysHit = 0;
  let maximumParlays = 0;
  // Top Left Square
  if (boardProp.topLeft) {
    if (boardProp.topLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.topLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.topLeft.multiplier * 100
      //console.log("Top Left Square HIT ", currentScore)
    }
  }

  // Top Right Square
  if (boardProp.topRight) {
    if (boardProp.topRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.topRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topRight.consensusOutcome == "Hit") {
      currentScore += boardProp.topRight.multiplier * 100
      //console.log("Top Right Square HIT ", currentScore)
    }
  }

  //Top Middle Square
  if (boardProp.topMiddle) {
    if (boardProp.topMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.topMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.topMiddle.multiplier * 100
      //console.log("Top Middle Square HIT ", currentScore)
    }
  }

  //Middle Left Square
  if (boardProp.middleLeft) {
    if (boardProp.middleLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.middleLeft.multiplier * 100
      //console.log("Middle Left Square HIT ", currentScore)
    }
  }

  //Middle Middle Square
  if (boardProp.middleMiddle) {
    if (boardProp.middleMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.middleMiddle.multiplier * 100
      //console.log("Middle Middle Square HIT ", currentScore)
    }
  }

  //Middle Right Square
  if (boardProp.middleRight) {
    if (boardProp.middleRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleRight.consensusOutcome == "Hit") {
      currentScore += boardProp.middleRight.multiplier * 100
      //console.log("Middle Right Square HIT ", currentScore)
    }
  }

  //Bottom Left Square
  if (boardProp.bottomLeft) {
    if (boardProp.bottomLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomLeft.multiplier * 100
      //console.log("Bottom Left Square HIT", currentScore)
    }
  }

  //Bottom Middle Square
  if (boardProp.bottomMiddle) {
    if (boardProp.bottomMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomMiddle.multiplier * 100
      //console.log("Bottom Middle Square HIT", currentScore)
    }
  }

  //Bottom Right Square
  if (boardProp.bottomRight) {
    if (boardProp.bottomRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomRight.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomRight.multiplier * 100
      //console.log("Bottom Right Square HIT ", currentScore)
    }
  }

  //Top Parlay
  if (boardProp.topLeft && boardProp.topMiddle && boardProp.topRight) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
      //console.log("Top Parlay bonus HIT")
    }
  }

  //Horizontal Middle Parlay
  if (boardProp.middleLeft && boardProp.middleMiddle && boardProp.middleRight) {
    if ((boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
    }
    if ((boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit")) {
      parlaysHit +=1;
      currentScore += (boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
      //console.log("Horizontal Middle Parlay bonus HIT ", currentScore)
    }
  }

  //Bottom Parlay
  if (boardProp.bottomLeft && boardProp.bottomMiddle && boardProp.bottomRight) {
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("Bottom Parlay bonus HIT ", currentScore)
    }
  }

  //Left Parlay
  if (boardProp.topLeft && boardProp.middleLeft && boardProp.bottomLeft) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.bottomLeft.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.bottomLeft.consensusOutcome == "Hit")) {
      //console.log("Left Parlay bonus HIT +800", boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
      parlaysHit += 1;
      currentScore += (boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
    }
  }

  //Right Parlay
  if (boardProp.topRight && boardProp.middleRight && boardProp.bottomRight) {
    if ((boardProp.topRight.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.topRight.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("Right Parlay bonus HIT")
    }
  }
  //Vertical Middle Parlay
  if (boardProp.topMiddle && boardProp.middleMiddle && boardProp.bottomMiddle) {
    if ((boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
    }
    if ((boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
      //console.log("Vertical Middle Parlay bonus HIT")
    }
  }

  //TL MM BR Diagonal Parlay
  if (boardProp.topLeft && boardProp.middleMiddle && boardProp.bottomRight) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1
      maximumScore += (boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("TL MM BR Diagonal Parlay bonus HIT")
    }
  }

  //BL MM TR Diagonal Parlay
  if (boardProp.bottomLeft && boardProp.middleMiddle && boardProp.topRight) {
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
      //console.log("BL MM TR Diagonal Parlay bonus HIT")
    }
  }
  //console.log("current score", currentScore)
  boardProp.currentScore = currentScore;
  //console.log("max score", maximumScore)
  boardProp.maxPossibleScore = maximumScore;

  boardProp["parlaysHit"] = parlaysHit;
  boardProp["remainingParlays"] = maximumParlays - parlaysHit;
}
//Calculate Score for the Backend: Adds the score to the board Object
export function calculateScoreNew(boardProp: Board): void {
    let currentScore = 0;
    let maximumScore = 0;
    let parlaysHit = 0;
    let maximumParlays = 0;
    // Top Left Square
    if (boardProp.topLeft) {
      if (boardProp.topLeft.consensusOutcome != "Miss") {
        maximumScore += boardProp.topLeft.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.topLeft.consensusOutcome == "Hit") {
        currentScore += boardProp.topLeft.multiplier * 100
        //console.log("Top Left Square HIT ", currentScore)
      }
    }

    // Top Right Square
    if (boardProp.topRight) {
      if (boardProp.topRight.consensusOutcome != "Miss") {
        maximumScore += boardProp.topRight.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.topRight.consensusOutcome == "Hit") {
        currentScore += boardProp.topRight.multiplier * 100
        //console.log("Top Right Square HIT ", currentScore)
      }
    }
  
    //Top Middle Square
    if (boardProp.topMiddle) {
      if (boardProp.topMiddle.consensusOutcome != "Miss") {
        maximumScore += boardProp.topMiddle.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.topMiddle.consensusOutcome == "Hit") {
        currentScore += boardProp.topMiddle.multiplier * 100
        //console.log("Top Middle Square HIT ", currentScore)
      }
    }
  
    //Middle Left Square
    if (boardProp.middleLeft) {
      if (boardProp.middleLeft.consensusOutcome != "Miss") {
        maximumScore += boardProp.middleLeft.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.middleLeft.consensusOutcome == "Hit") {
        currentScore += boardProp.middleLeft.multiplier * 100
        //console.log("Middle Left Square HIT ", currentScore)
      }
    }
  
    //Middle Middle Square
    if (boardProp.middleMiddle) {
      if (boardProp.middleMiddle.consensusOutcome != "Miss") {
        maximumScore += boardProp.middleMiddle.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.middleMiddle.consensusOutcome == "Hit") {
        currentScore += boardProp.middleMiddle.multiplier * 100
        //console.log("Middle Middle Square HIT ", currentScore)
      }
    }
  
    //Middle Right Square
    if (boardProp.middleRight) {
      if (boardProp.middleRight.consensusOutcome != "Miss") {
        maximumScore += boardProp.middleRight.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.middleRight.consensusOutcome == "Hit") {
        currentScore += boardProp.middleRight.multiplier * 100
        //console.log("Middle Right Square HIT ", currentScore)
      }
    }
  
    //Bottom Left Square
    if (boardProp.bottomLeft) {
      if (boardProp.bottomLeft.consensusOutcome != "Miss") {
        maximumScore += boardProp.bottomLeft.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.bottomLeft.consensusOutcome == "Hit") {
        currentScore += boardProp.bottomLeft.multiplier * 100
        //console.log("Bottom Left Square HIT", currentScore)
      }
    }
  
    //Bottom Middle Square
    if (boardProp.bottomMiddle) {
      if (boardProp.bottomMiddle.consensusOutcome != "Miss") {
        maximumScore += boardProp.bottomMiddle.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.bottomMiddle.consensusOutcome == "Hit") {
        currentScore += boardProp.bottomMiddle.multiplier * 100
        //console.log("Bottom Middle Square HIT", currentScore)
      }
    }
  
    //Bottom Right Square
    if (boardProp.bottomRight) {
      if (boardProp.bottomRight.consensusOutcome != "Miss") {
        maximumScore += boardProp.bottomRight.multiplier * 100
        //console.log(maximumScore)
      }
      if (boardProp.bottomRight.consensusOutcome == "Hit") {
        currentScore += boardProp.bottomRight.multiplier * 100
        //console.log("Bottom Right Square HIT ", currentScore)
      }
    }
  
    //Top Parlay
    if (boardProp.topLeft && boardProp.topMiddle && boardProp.topRight) {
      if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
        maximumParlays += 1;
        maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.topMiddle.multiplier, boardProp.topRight.multiplier)
      }
      if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
        parlaysHit += 1;
        currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.topMiddle.multiplier, boardProp.topRight.multiplier)
        //(boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
        //console.log("Top Parlay bonus HIT")
      }
    }
  
    //Horizontal Middle Parlay
    if (boardProp.middleLeft && boardProp.middleMiddle && boardProp.middleRight) {
      if ((boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss")) {
        maximumParlays += 1;
        maximumScore += calculateParlayBonus(boardProp.middleLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.middleRight.multiplier)
      }
      if ((boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit")) {
        parlaysHit +=1;
        currentScore += calculateParlayBonus(boardProp.middleLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.middleRight.multiplier)
        //(boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
        //console.log("Horizontal Middle Parlay bonus HIT ", currentScore)
      }
    }
  
    //Bottom Parlay
    if (boardProp.bottomLeft && boardProp.bottomMiddle && boardProp.bottomRight) {
      if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
        maximumParlays += 1;
        maximumScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.bottomMiddle.multiplier, boardProp.bottomRight.multiplier)
      }
      if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
        parlaysHit += 1;
        currentScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.bottomMiddle.multiplier, boardProp.bottomRight.multiplier)
        //(boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
        //console.log("Bottom Parlay bonus HIT ", currentScore)
      }
    }
  
    //Left Parlay
    if (boardProp.topLeft && boardProp.middleLeft && boardProp.bottomLeft) {
      if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.bottomLeft.consensusOutcome != "Miss")) {
        maximumParlays += 1;
        maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleLeft.multiplier, boardProp.bottomLeft.multiplier)
      }
      if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.bottomLeft.consensusOutcome == "Hit")) {
        //console.log("Left Parlay bonus HIT +800", boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
        parlaysHit += 1;
        currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleLeft.multiplier, boardProp.bottomLeft.multiplier)
        //(boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
      }
    }
  
    //Right Parlay
    if (boardProp.topRight && boardProp.middleRight && boardProp.bottomRight) {
      if ((boardProp.topRight.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
        maximumParlays += 1;
        maximumScore += calculateParlayBonus(boardProp.topRight.multiplier, boardProp.middleRight.multiplier, boardProp.bottomRight.multiplier)
      }
      if ((boardProp.topRight.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
        parlaysHit += 1;
        currentScore += calculateParlayBonus(boardProp.topRight.multiplier, boardProp.middleRight.multiplier, boardProp.bottomRight.multiplier)
        //(boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
        //console.log("Right Parlay bonus HIT")
      }
    }
    //Vertical Middle Parlay
    if (boardProp.topMiddle && boardProp.middleMiddle && boardProp.bottomMiddle) {
      if ((boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss")) {
        maximumParlays += 1;
        maximumScore += calculateParlayBonus(boardProp.topMiddle.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomMiddle.multiplier)
      }
      if ((boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit")) {
        parlaysHit += 1;
        currentScore += calculateParlayBonus(boardProp.topMiddle.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomMiddle.multiplier)
        //(boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
        //console.log("Vertical Middle Parlay bonus HIT")
      }
    }
  
    //TL MM BR Diagonal Parlay
    if (boardProp.topLeft && boardProp.middleMiddle && boardProp.bottomRight) {
      if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
        maximumParlays += 1
        maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomRight.multiplier)
      }
      if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
        parlaysHit += 1;
        currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomRight.multiplier)
        //(boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
        //console.log("TL MM BR Diagonal Parlay bonus HIT")
      }
    }
  
    //BL MM TR Diagonal Parlay
    if (boardProp.bottomLeft && boardProp.middleMiddle && boardProp.topRight) {
      if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
        maximumParlays += 1;
        maximumScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.topRight.multiplier)
      }
      if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
        parlaysHit += 1;
        currentScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.topRight.multiplier)
        //(boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
        //console.log("BL MM TR Diagonal Parlay bonus HIT")
      }
    }
    //console.log("current score", currentScore)
    boardProp.currentScore = currentScore;
    //console.log("max score", maximumScore)
    boardProp.maxPossibleScore = maximumScore;

    boardProp["parlaysHit"] = parlaysHit;
    boardProp["remainingParlays"] = maximumParlays - parlaysHit;
}
/****************************SCORING FUNCTION FOR THE FRONTEND *************/
//@depreciated: This is the old way of calculating the score. See getCalculatedScoresObjectNew for the new way.
//calculate_score
export function getCalculatedScoresObjectOld(boardProp: Board):Score{
  let currentScore = 0;
  let maximumScore = 0;
  let parlaysHit = 0;
  let maximumParlays = 0;
  // Top Left Square
  if (boardProp.topLeft) {
    if (boardProp.topLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.topLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.topLeft.multiplier * 100
      //console.log("Top Left Square HIT ", currentScore)
    }
  }

  // Top Right Square
  if (boardProp.topRight) {
    if (boardProp.topRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.topRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topRight.consensusOutcome == "Hit") {
      currentScore += boardProp.topRight.multiplier * 100
      //console.log("Top Right Square HIT ", currentScore)
    }
  }

  //Top Middle Square
  if (boardProp.topMiddle) {
    if (boardProp.topMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.topMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.topMiddle.multiplier * 100
      //console.log("Top Middle Square HIT ", currentScore)
    }
  }

  //Middle Left Square
  if (boardProp.middleLeft) {
    if (boardProp.middleLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.middleLeft.multiplier * 100
      //console.log("Middle Left Square HIT ", currentScore)
    }
  }

  //Middle Middle Square
  if (boardProp.middleMiddle) {
    if (boardProp.middleMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.middleMiddle.multiplier * 100
      //console.log("Middle Middle Square HIT ", currentScore)
    }
  }

  //Middle Right Square
  if (boardProp.middleRight) {
    if (boardProp.middleRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleRight.consensusOutcome == "Hit") {
      currentScore += boardProp.middleRight.multiplier * 100
      //console.log("Middle Right Square HIT ", currentScore)
    }
  }

  //Bottom Left Square
  if (boardProp.bottomLeft) {
    if (boardProp.bottomLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomLeft.multiplier * 100
      //console.log("Bottom Left Square HIT", currentScore)
    }
  }

  //Bottom Middle Square
  if (boardProp.bottomMiddle) {
    if (boardProp.bottomMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomMiddle.multiplier * 100
      //console.log("Bottom Middle Square HIT", currentScore)
    }
  }

  //Bottom Right Square
  if (boardProp.bottomRight) {
    if (boardProp.bottomRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomRight.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomRight.multiplier * 100
      //console.log("Bottom Right Square HIT ", currentScore)
    }
  }

  //Top Parlay
  if (boardProp.topLeft && boardProp.topMiddle && boardProp.topRight) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
      //console.log("Top Parlay bonus HIT")
    }
  }

  //Horizontal Middle Parlay
  if (boardProp.middleLeft && boardProp.middleMiddle && boardProp.middleRight) {
    if ((boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
    }
    if ((boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit")) {
      parlaysHit +=1;
      currentScore += (boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
      //console.log("Horizontal Middle Parlay bonus HIT ", currentScore)
    }
  }

  //Bottom Parlay
  if (boardProp.bottomLeft && boardProp.bottomMiddle && boardProp.bottomRight) {
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("Bottom Parlay bonus HIT ", currentScore)
    }
  }

  //Left Parlay
  if (boardProp.topLeft && boardProp.middleLeft && boardProp.bottomLeft) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.bottomLeft.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.bottomLeft.consensusOutcome == "Hit")) {
      //console.log("Left Parlay bonus HIT +800", boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
      parlaysHit += 1;
      currentScore += (boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
    }
  }

  //Right Parlay
  if (boardProp.topRight && boardProp.middleRight && boardProp.bottomRight) {
    if ((boardProp.topRight.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.topRight.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("Right Parlay bonus HIT")
    }
  }
  //Vertical Middle Parlay
  if (boardProp.topMiddle && boardProp.middleMiddle && boardProp.bottomMiddle) {
    if ((boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
    }
    if ((boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
      //console.log("Vertical Middle Parlay bonus HIT")
    }
  }

  //TL MM BR Diagonal Parlay
  if (boardProp.topLeft && boardProp.middleMiddle && boardProp.bottomRight) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1
      maximumScore += (boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("TL MM BR Diagonal Parlay bonus HIT")
    }
  }

  //BL MM TR Diagonal Parlay
  if (boardProp.bottomLeft && boardProp.middleMiddle && boardProp.topRight) {
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += (boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += (boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
      //console.log("BL MM TR Diagonal Parlay bonus HIT")
    }
  }
  return {
    maxPossibleScore: maximumScore,
    currentScore: currentScore,
    parlaysHit: parlaysHit,
    remainingParlays: maximumParlays - parlaysHit
  }
};
export function getCalculatedScoresObjectNew(boardProp: Board):Score{
  let currentScore = 0;
  let maximumScore = 0;
  let parlaysHit = 0;
  let maximumParlays = 0;
  // Top Left Square
  if (boardProp.topLeft) {
    if (boardProp.topLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.topLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.topLeft.multiplier * 100
      //console.log("Top Left Square HIT ", currentScore)
    }
  }

  // Top Right Square
  if (boardProp.topRight) {
    if (boardProp.topRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.topRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topRight.consensusOutcome == "Hit") {
      currentScore += boardProp.topRight.multiplier * 100
      //console.log("Top Right Square HIT ", currentScore)
    }
  }

  //Top Middle Square
  if (boardProp.topMiddle) {
    if (boardProp.topMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.topMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.topMiddle.multiplier * 100
      //console.log("Top Middle Square HIT ", currentScore)
    }
  }

  //Middle Left Square
  if (boardProp.middleLeft) {
    if (boardProp.middleLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.middleLeft.multiplier * 100
      //console.log("Middle Left Square HIT ", currentScore)
    }
  }

  //Middle Middle Square
  if (boardProp.middleMiddle) {
    if (boardProp.middleMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.middleMiddle.multiplier * 100
      //console.log("Middle Middle Square HIT ", currentScore)
    }
  }

  //Middle Right Square
  if (boardProp.middleRight) {
    if (boardProp.middleRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.middleRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleRight.consensusOutcome == "Hit") {
      currentScore += boardProp.middleRight.multiplier * 100
      //console.log("Middle Right Square HIT ", currentScore)
    }
  }

  //Bottom Left Square
  if (boardProp.bottomLeft) {
    if (boardProp.bottomLeft.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomLeft.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomLeft.multiplier * 100
      //console.log("Bottom Left Square HIT", currentScore)
    }
  }

  //Bottom Middle Square
  if (boardProp.bottomMiddle) {
    if (boardProp.bottomMiddle.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomMiddle.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomMiddle.multiplier * 100
      //console.log("Bottom Middle Square HIT", currentScore)
    }
  }

  //Bottom Right Square
  if (boardProp.bottomRight) {
    if (boardProp.bottomRight.consensusOutcome != "Miss") {
      maximumScore += boardProp.bottomRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomRight.consensusOutcome == "Hit") {
      currentScore += boardProp.bottomRight.multiplier * 100
      //console.log("Bottom Right Square HIT ", currentScore)
    }
  }

  //Top Parlay
  if (boardProp.topLeft && boardProp.topMiddle && boardProp.topRight) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.topMiddle.multiplier, boardProp.topRight.multiplier)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.topMiddle.multiplier, boardProp.topRight.multiplier)
      //console.log("Top Parlay bonus HIT")
    }
  }

  //Horizontal Middle Parlay
  if (boardProp.middleLeft && boardProp.middleMiddle && boardProp.middleRight) {
    if ((boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += calculateParlayBonus(boardProp.middleLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.middleRight.multiplier)
    }
    if ((boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit")) {
      parlaysHit +=1;
      currentScore += calculateParlayBonus(boardProp.middleLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.middleRight.multiplier);
      //console.log("Horizontal Middle Parlay bonus HIT ", currentScore)
    }
  }

  //Bottom Parlay
  if (boardProp.bottomLeft && boardProp.bottomMiddle && boardProp.bottomRight) {
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.bottomMiddle.multiplier, boardProp.bottomRight.multiplier)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.bottomMiddle.multiplier, boardProp.bottomRight.multiplier)
      //console.log("Bottom Parlay bonus HIT ", currentScore)
    }
  }

  //Left Parlay
  if (boardProp.topLeft && boardProp.middleLeft && boardProp.bottomLeft) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.bottomLeft.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleLeft.multiplier, boardProp.bottomLeft.multiplier)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.bottomLeft.consensusOutcome == "Hit")) {
      //console.log("Left Parlay bonus HIT +800", boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
      parlaysHit += 1;
      currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleLeft.multiplier, boardProp.bottomLeft.multiplier);
    }
  }

  //Right Parlay
  if (boardProp.topRight && boardProp.middleRight && boardProp.bottomRight) {
    if ((boardProp.topRight.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += calculateParlayBonus(boardProp.topRight.multiplier, boardProp.middleRight.multiplier, boardProp.bottomRight.multiplier)
    }
    if ((boardProp.topRight.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += calculateParlayBonus(boardProp.topRight.multiplier, boardProp.middleRight.multiplier, boardProp.bottomRight.multiplier)
      //console.log("Right Parlay bonus HIT")
    }
  }
  //Vertical Middle Parlay
  if (boardProp.topMiddle && boardProp.middleMiddle && boardProp.bottomMiddle) {
    if ((boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += calculateParlayBonus(boardProp.topMiddle.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomMiddle.multiplier)
    }
    if ((boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += calculateParlayBonus(boardProp.topMiddle.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomMiddle.multiplier)
      //console.log("Vertical Middle Parlay bonus HIT")
    }
  }

  //TL MM BR Diagonal Parlay
  if (boardProp.topLeft && boardProp.middleMiddle && boardProp.bottomRight) {
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      maximumParlays += 1
      maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomRight.multiplier)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomRight.multiplier)
      //console.log("TL MM BR Diagonal Parlay bonus HIT")
    }
  }

  //BL MM TR Diagonal Parlay
  if (boardProp.bottomLeft && boardProp.middleMiddle && boardProp.topRight) {
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      maximumParlays += 1;
      maximumScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.topRight.multiplier)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      parlaysHit += 1;
      currentScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.topRight.multiplier)
      //console.log("BL MM TR Diagonal Parlay bonus HIT")
    }
  }
  return {
    maxPossibleScore: maximumScore,
    currentScore: currentScore,
    parlaysHit: parlaysHit,
    remainingParlays: maximumParlays - parlaysHit
  }
}



//exports.calculate_score = calculate_score;
//@deprecated: Only for Old Contests. Please Use calculateScoreNew for new contests.
export function calculateAdvancedScoreOld(boardProp: Board):AdvancedScore{
  let s: AdvancedScore = {
    currentScore:  0,
    parlaysHit:  0,
    maximumScore: 0,
    maximumParlays:0,
    remainingParlays:  0,
    individualPropTotal:  0,
    topRowPoints:  0,
    topRowHit: false,
    middleRowPoints:  0,
    middleRowHit: false,
    bottomRowPoints:  0,
    bottomRowHit: false,
    leftColPoints:  0,
    leftColHit: false,
    middleColPoints: 0,
    middleColHit: false,
    rightColPoints: 0,
    rightColHit: false,
    leftRightDiagPoints:  0,
    leftRightDiagHit: false,
    rightLeftDiagPoints:  0,
    rightLeftDiagHit: false,
}
  // Top Left Square
  if (boardProp.topLeft) {
    if (boardProp.topLeft.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.topLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topLeft.consensusOutcome == "Hit") {
      s.currentScore += boardProp.topLeft.multiplier * 100
      s.individualPropTotal += boardProp.topLeft.multiplier * 100
      //console.log("Top Left Square HIT ", currentScore)
    }
  }

  // Top Right Square
  if (boardProp.topRight) {
    if (boardProp.topRight.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.topRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topRight.consensusOutcome == "Hit") {
      s.currentScore += boardProp.topRight.multiplier * 100
      s.individualPropTotal += boardProp.topRight.multiplier * 100
      //console.log("Top Right Square HIT ", currentScore)
    }
  }

  //Top Middle Square
  if (boardProp.topMiddle) {
    if (boardProp.topMiddle.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.topMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topMiddle.consensusOutcome == "Hit") {
      s.currentScore += boardProp.topMiddle.multiplier * 100
      s.individualPropTotal += boardProp.topMiddle.multiplier * 100
      //console.log("Top Middle Square HIT ", currentScore)
    }
  }

  //Middle Left Square
  if (boardProp.middleLeft) {
    if (boardProp.middleLeft.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.middleLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleLeft.consensusOutcome == "Hit") {
      s.currentScore += boardProp.middleLeft.multiplier * 100
      s.individualPropTotal += boardProp.middleLeft.multiplier * 100
      //console.log("Middle Left Square HIT ", currentScore)
    }
  }

  //Middle Middle Square
  if (boardProp.middleMiddle) {
    if (boardProp.middleMiddle.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.middleMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleMiddle.consensusOutcome == "Hit") {
      s.currentScore += boardProp.middleMiddle.multiplier * 100
      s.individualPropTotal += boardProp.middleMiddle.multiplier * 100
      //console.log("Middle Middle Square HIT ", currentScore)
    }
  }

  //Middle Right Square
  if (boardProp.middleRight) {
    if (boardProp.middleRight.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.middleRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleRight.consensusOutcome == "Hit") {
      s.currentScore += boardProp.middleRight.multiplier * 100
      s.individualPropTotal += boardProp.middleRight.multiplier * 100
      //console.log("Middle Right Square HIT ", currentScore)
    }
  }

  //Bottom Left Square
  if (boardProp.bottomLeft) {
    if (boardProp.bottomLeft.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.bottomLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomLeft.consensusOutcome == "Hit") {
      s.currentScore += boardProp.bottomLeft.multiplier * 100
      s.individualPropTotal += boardProp.bottomLeft.multiplier * 100
      //console.log("Bottom Left Square HIT", currentScore)
    }
  }

  //Bottom Middle Square
  if (boardProp.bottomMiddle) {
    if (boardProp.bottomMiddle.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.bottomMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomMiddle.consensusOutcome == "Hit") {
      s.currentScore += boardProp.bottomMiddle.multiplier * 100
      s.individualPropTotal += boardProp.bottomMiddle.multiplier * 100
      //console.log("Bottom Middle Square HIT", currentScore)
    }
  }

  //Bottom Right Square
  if (boardProp.bottomRight) {
    if (boardProp.bottomRight.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.bottomRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomRight.consensusOutcome == "Hit") {
      s.currentScore += boardProp.bottomRight.multiplier * 100
      s.individualPropTotal += boardProp.bottomRight.multiplier * 100
      //console.log("Bottom Right Square HIT ", currentScore)
    }
  }

  //Top Parlay
  if (boardProp.topLeft && boardProp.topMiddle && boardProp.topRight) {
    s.topRowPoints += (boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += (boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.currentScore += (boardProp.topLeft.multiplier * boardProp.topMiddle.multiplier * boardProp.topRight.multiplier * 100)
      s.topRowHit = true
      //console.log("Top Parlay bonus HIT")
    }
  }

  //Horizontal Middle Parlay
  if (boardProp.middleLeft && boardProp.middleMiddle && boardProp.middleRight) {
    s.middleRowPoints += (boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
    if ((boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += (boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
    }
    if ((boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit")) {
      s.parlaysHit +=1;
      s.currentScore += (boardProp.middleLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.middleRight.multiplier * 100)
      //console.log("Horizontal Middle Parlay bonus HIT ", currentScore)
      s.middleRowHit = true
    }
  }

  //Bottom Parlay
  if (boardProp.bottomLeft && boardProp.bottomMiddle && boardProp.bottomRight) {
    s.bottomRowPoints += (boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += (boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.bottomRowHit = true
      s.currentScore += (boardProp.bottomLeft.multiplier * boardProp.bottomMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("Bottom Parlay bonus HIT ", currentScore)
    }
  }

  //Left Parlay
  if (boardProp.topLeft && boardProp.middleLeft && boardProp.bottomLeft) {
    s.leftColPoints += (boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.bottomLeft.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += (boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.bottomLeft.consensusOutcome == "Hit")) {
      //console.log("Left Parlay bonus HIT +800", boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
      s.parlaysHit += 1;
      s.leftColHit = true;
      s.currentScore += (boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
    }
  }

  //Right Parlay
  if (boardProp.topRight && boardProp.middleRight && boardProp.bottomRight) {
    s.rightColPoints += (boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
    if ((boardProp.topRight.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += (boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.topRight.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.rightColHit = true;
      s.currentScore += (boardProp.topRight.multiplier * boardProp.middleRight.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("Right Parlay bonus HIT")
    }
  }
  //Vertical Middle Parlay
  if (boardProp.topMiddle && boardProp.middleMiddle && boardProp.bottomMiddle) {
    s.middleColPoints += (boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
    if ((boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += (boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
    }
    if ((boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.middleColHit = true;
      s.currentScore += (boardProp.topMiddle.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomMiddle.multiplier * 100)
      //console.log("Vertical Middle Parlay bonus HIT")
    }
  }

  //TL MM BR Diagonal Parlay
  if (boardProp.topLeft && boardProp.middleMiddle && boardProp.bottomRight) {
    s.leftRightDiagPoints += (boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1
      s.maximumScore += (boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.leftRightDiagHit = true;
      s.currentScore += (boardProp.topLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.bottomRight.multiplier * 100)
      //console.log("TL MM BR Diagonal Parlay bonus HIT")
    }
  }

  //BL MM TR Diagonal Parlay
  if (boardProp.bottomLeft && boardProp.middleMiddle && boardProp.topRight) {
    s.rightLeftDiagPoints += (boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += (boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.rightLeftDiagHit = true;
      s.currentScore += (boardProp.bottomLeft.multiplier * boardProp.middleMiddle.multiplier * boardProp.topRight.multiplier * 100)
      //console.log("BL MM TR Diagonal Parlay bonus HIT")
    }
  }
  return s;
}

export function calculateAdvancedScoreNew(boardProp: Board):AdvancedScore{
  let s: AdvancedScore = {
    currentScore:  0,
    parlaysHit:  0,
    maximumScore: 0,
    maximumParlays:0,
    remainingParlays:  0,
    individualPropTotal:  0,
    topRowPoints:  0,
    topRowHit: false,
    middleRowPoints:  0,
    middleRowHit: false,
    bottomRowPoints:  0,
    bottomRowHit: false,
    leftColPoints:  0,
    leftColHit: false,
    middleColPoints: 0,
    middleColHit: false,
    rightColPoints: 0,
    rightColHit: false,
    leftRightDiagPoints:  0,
    leftRightDiagHit: false,
    rightLeftDiagPoints:  0,
    rightLeftDiagHit: false,
}
  // Top Left Square
  if (boardProp.topLeft) {
    if (boardProp.topLeft.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.topLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topLeft.consensusOutcome == "Hit") {
      s.currentScore += boardProp.topLeft.multiplier * 100
      s.individualPropTotal += boardProp.topLeft.multiplier * 100
      //console.log("Top Left Square HIT ", currentScore)
    }
  }

  // Top Right Square
  if (boardProp.topRight) {
    if (boardProp.topRight.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.topRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topRight.consensusOutcome == "Hit") {
      s.currentScore += boardProp.topRight.multiplier * 100
      s.individualPropTotal += boardProp.topRight.multiplier * 100
      //console.log("Top Right Square HIT ", currentScore)
    }
  }

  //Top Middle Square
  if (boardProp.topMiddle) {
    if (boardProp.topMiddle.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.topMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.topMiddle.consensusOutcome == "Hit") {
      s.currentScore += boardProp.topMiddle.multiplier * 100
      s.individualPropTotal += boardProp.topMiddle.multiplier * 100
      //console.log("Top Middle Square HIT ", currentScore)
    }
  }

  //Middle Left Square
  if (boardProp.middleLeft) {
    if (boardProp.middleLeft.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.middleLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleLeft.consensusOutcome == "Hit") {
      s.currentScore += boardProp.middleLeft.multiplier * 100
      s.individualPropTotal += boardProp.middleLeft.multiplier * 100
      //console.log("Middle Left Square HIT ", currentScore)
    }
  }

  //Middle Middle Square
  if (boardProp.middleMiddle) {
    if (boardProp.middleMiddle.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.middleMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleMiddle.consensusOutcome == "Hit") {
      s.currentScore += boardProp.middleMiddle.multiplier * 100
      s.individualPropTotal += boardProp.middleMiddle.multiplier * 100
      //console.log("Middle Middle Square HIT ", currentScore)
    }
  }

  //Middle Right Square
  if (boardProp.middleRight) {
    if (boardProp.middleRight.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.middleRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.middleRight.consensusOutcome == "Hit") {
      s.currentScore += boardProp.middleRight.multiplier * 100
      s.individualPropTotal += boardProp.middleRight.multiplier * 100
      //console.log("Middle Right Square HIT ", currentScore)
    }
  }

  //Bottom Left Square
  if (boardProp.bottomLeft) {
    if (boardProp.bottomLeft.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.bottomLeft.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomLeft.consensusOutcome == "Hit") {
      s.currentScore += boardProp.bottomLeft.multiplier * 100
      s.individualPropTotal += boardProp.bottomLeft.multiplier * 100
      //console.log("Bottom Left Square HIT", currentScore)
    }
  }

  //Bottom Middle Square
  if (boardProp.bottomMiddle) {
    if (boardProp.bottomMiddle.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.bottomMiddle.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomMiddle.consensusOutcome == "Hit") {
      s.currentScore += boardProp.bottomMiddle.multiplier * 100
      s.individualPropTotal += boardProp.bottomMiddle.multiplier * 100
      //console.log("Bottom Middle Square HIT", currentScore)
    }
  }

  //Bottom Right Square
  if (boardProp.bottomRight) {
    if (boardProp.bottomRight.consensusOutcome != "Miss") {
      s.maximumScore += boardProp.bottomRight.multiplier * 100
      //console.log(maximumScore)
    }
    if (boardProp.bottomRight.consensusOutcome == "Hit") {
      s.currentScore += boardProp.bottomRight.multiplier * 100
      s.individualPropTotal += boardProp.bottomRight.multiplier * 100
      //console.log("Bottom Right Square HIT ", currentScore)
    }
  }

  //Top Parlay
  if (boardProp.topLeft && boardProp.topMiddle && boardProp.topRight) {
    s.topRowPoints += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.topMiddle.multiplier, boardProp.topRight.multiplier);
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.topMiddle.multiplier, boardProp.topRight.multiplier)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.topMiddle.multiplier, boardProp.topRight.multiplier)
      s.topRowHit = true
      //console.log("Top Parlay bonus HIT")
    }
  }

  //Horizontal Middle Parlay
  if (boardProp.middleLeft && boardProp.middleMiddle && boardProp.middleRight) {
    s.middleRowPoints += calculateParlayBonus(boardProp.middleLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.middleRight.multiplier);
    if ((boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += calculateParlayBonus(boardProp.middleLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.middleRight.multiplier)
    }
    if ((boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit")) {
      s.parlaysHit +=1;
      s.currentScore += calculateParlayBonus(boardProp.middleLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.middleRight.multiplier)
      //console.log("Horizontal Middle Parlay bonus HIT ", currentScore)
      s.middleRowHit = true
    }
  }

  //Bottom Parlay
  if (boardProp.bottomLeft && boardProp.bottomMiddle && boardProp.bottomRight) {
    s.bottomRowPoints += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.bottomMiddle.multiplier, boardProp.bottomRight.multiplier);
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.bottomMiddle.multiplier, boardProp.bottomRight.multiplier)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.bottomRowHit = true
      s.currentScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.bottomMiddle.multiplier, boardProp.bottomRight.multiplier)
      //console.log("Bottom Parlay bonus HIT ", currentScore)
    }
  }

  //Left Parlay
  if (boardProp.topLeft && boardProp.middleLeft && boardProp.bottomLeft) {
    s.leftColPoints += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleLeft.multiplier, boardProp.bottomLeft.multiplier);
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleLeft.consensusOutcome != "Miss") && (boardProp.bottomLeft.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleLeft.multiplier, boardProp.bottomLeft.multiplier)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleLeft.consensusOutcome == "Hit") && (boardProp.bottomLeft.consensusOutcome == "Hit")) {
      //console.log("Left Parlay bonus HIT +800", boardProp.topLeft.multiplier * boardProp.middleLeft.multiplier * boardProp.bottomLeft.multiplier * 100)
      s.parlaysHit += 1;
      s.leftColHit = true;
      s.currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleLeft.multiplier, boardProp.bottomLeft.multiplier)
    }
  }

  //Right Parlay
  if (boardProp.topRight && boardProp.middleRight && boardProp.bottomRight) {
    s.rightColPoints += calculateParlayBonus(boardProp.topRight.multiplier, boardProp.middleRight.multiplier, boardProp.bottomRight.multiplier);
    if ((boardProp.topRight.consensusOutcome != "Miss") && (boardProp.middleRight.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += calculateParlayBonus(boardProp.topRight.multiplier, boardProp.middleRight.multiplier, boardProp.bottomRight.multiplier)
    }
    if ((boardProp.topRight.consensusOutcome == "Hit") && (boardProp.middleRight.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.rightColHit = true;
      s.currentScore += calculateParlayBonus(boardProp.topRight.multiplier, boardProp.middleRight.multiplier, boardProp.bottomRight.multiplier)
      //console.log("Right Parlay bonus HIT")
    }
  }
  //Vertical Middle Parlay
  if (boardProp.topMiddle && boardProp.middleMiddle && boardProp.bottomMiddle) {
    s.middleColPoints += calculateParlayBonus(boardProp.topMiddle.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomMiddle.multiplier);
    if ((boardProp.topMiddle.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomMiddle.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += calculateParlayBonus(boardProp.topMiddle.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomMiddle.multiplier)
    }
    if ((boardProp.topMiddle.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomMiddle.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.middleColHit = true;
      s.currentScore += calculateParlayBonus(boardProp.topMiddle.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomMiddle.multiplier)
      //console.log("Vertical Middle Parlay bonus HIT")
    }
  }

  //TL MM BR Diagonal Parlay
  if (boardProp.topLeft && boardProp.middleMiddle && boardProp.bottomRight) {
    s.leftRightDiagPoints += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomRight.multiplier);
    if ((boardProp.topLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.bottomRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1
      s.maximumScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomRight.multiplier)
    }
    if ((boardProp.topLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.bottomRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.leftRightDiagHit = true;
      s.currentScore += calculateParlayBonus(boardProp.topLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.bottomRight.multiplier)
      //console.log("TL MM BR Diagonal Parlay bonus HIT")
    }
  }

  //BL MM TR Diagonal Parlay
  if (boardProp.bottomLeft && boardProp.middleMiddle && boardProp.topRight) {
    s.rightLeftDiagPoints += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.topRight.multiplier)
    if ((boardProp.bottomLeft.consensusOutcome != "Miss") && (boardProp.middleMiddle.consensusOutcome != "Miss") && (boardProp.topRight.consensusOutcome != "Miss")) {
      s.maximumParlays += 1;
      s.maximumScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.topRight.multiplier)
    }
    if ((boardProp.bottomLeft.consensusOutcome == "Hit") && (boardProp.middleMiddle.consensusOutcome == "Hit") && (boardProp.topRight.consensusOutcome == "Hit")) {
      s.parlaysHit += 1;
      s.rightLeftDiagHit = true;
      s.currentScore += calculateParlayBonus(boardProp.bottomLeft.multiplier, boardProp.middleMiddle.multiplier, boardProp.topRight.multiplier)
      //console.log("BL MM TR Diagonal Parlay bonus HIT")
    }
  }
  return s;
}