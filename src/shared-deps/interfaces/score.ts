import { Board } from "./Board";

export function calculateScore(boardProp: Board) {
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
//exports.calculate_score = calculate_score;