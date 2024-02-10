import { BettingProp } from "./BettingProp";
import { Contest } from "./Contest";
import { User } from "./User";
import { Types } from "mongoose";
export type BoardPositionsTypes = "topLeft" | "topMiddle" | "topRight" |
                                "middleLeft" | "middleMiddle" | "middleRight" |
                                "bottomLeft" | "bottomMiddle" | "bottomRight";
export const boardPositionsList: BoardPositionsTypes[] = ["topLeft","topMiddle","topRight",
                                                        "middleLeft","middleMiddle","middleRight",
                                                        "bottomLeft","bottomMiddle","bottomRight"];

//ddd
//Interface for a board
export interface Board { 
    _id?: string;
    contestId: Contest | string | null;
    currentScore: number;
    maxPossibleScore: number; //highest score factoring in wins and losses
    userInfo: User | null; //will either be the user _id from MongoDb, populate data or null;
    topLeft: BettingProp | null;
    topMiddle: BettingProp | null;
    topRight: BettingProp | null ;
    middleLeft: BettingProp | null;
    middleMiddle: BettingProp | null;
    middleRight: BettingProp | null;
    bottomLeft: BettingProp | null;
    bottomMiddle: BettingProp | null;
    bottomRight: BettingProp | null;
    //Added scoring parameters
    parlaysHit: number;
    remainingParlays: number;
    boardRank?: number;
    //new
    transactionId: Types.ObjectId | null;
    numEntries: number;
    settled: boolean;
    earnings: number;  // amount won from the contest
};

// export type boardPositionsType = "topLeft" | "topMiddle" | "topRight" | 
//                             "middleLeft" | "middleMiddle" | "middleRight" | 
//                             "bottomLeft" | "bottomMiddle" | "bottomRight";

const boardPositions: BoardPositionsTypes[] = ["topLeft","topMiddle","topRight",
    "middleLeft","middleMiddle","middleRight",
    "bottomLeft","bottomMiddle","bottomRight"];


//returns a list of the betting props in a board
export function listBoardProps(inputBoard: Board): BettingProp[] {
    let bettingPropsList: BettingProp[] = [];

    for (let index = 0; index < boardPositions.length; index++) {

        var propVar: null | BettingProp = inputBoard[(boardPositions[index])]

        if(propVar!=null){
            bettingPropsList.push(propVar);
        }
    }
    return bettingPropsList;
}

//returns if there is a prop in the list that would stop the addition of new props, returns true or false 
export function returnConflictingPropsInList(newBettingProp: BettingProp, existingProps: BettingProp[]): BettingProp[] {
    var conflictingProps = existingProps.filter(bp => {
        //TODO: clean up typescript errors
        //@ts-ignore 
        if(bp.entityInfo.displayName != newBettingProp?.entityInfo.displayName){
            return false
        }
        // if(bp.lastName != newBettingProp?.lastName){
        //     return false
        // }
        // if(bp.teamName != newBettingProp?.teamName){
        //     return false
        // }
        if(bp.bettingBetType != newBettingProp?.bettingBetType){
            return false
        }
        //logic below will not highlight bets of the same type with a higher multipliier
        /*
        if(bp.multiplier < newBettingProp?.multiplier){
            return false
        }
        */
        return true
    })
    return conflictingProps;
}
//returns the position of conflicting props, will return topLeft if no prop is found
export function getConflictingPropPositions(newBettingProp: BettingProp, existingBoard: Board): BoardPositionsTypes[] {
    
    const conflictingPropPositions: BoardPositionsTypes[] = [];
    const conflictingProps = returnConflictingPropsInList(newBettingProp,listBoardProps(existingBoard));
    console.log("conflicting", conflictingProps);
    for (let propIndex = 0; propIndex < conflictingProps.length; propIndex++){

        for (let index = 0; index < boardPositions.length; index++) {
            
            var propVar: null | BettingProp = existingBoard[(boardPositions[index])]

            if((propVar!=null)&&(conflictingProps[propIndex]._id==propVar._id)){
                conflictingPropPositions.push(boardPositions[index]);
            }
        }
    }
    return conflictingPropPositions; //return topleft if there are no conflicting props
}

//returns true or false if there is a conflicting prop in a list
export function conflictingPropsInList(newBettingProp: BettingProp, existingProps: BettingProp[]): boolean {
    var conflictingProps = returnConflictingPropsInList(newBettingProp, existingProps);
    if(conflictingProps.length > 0){
        return true;
    }
    return false;
}

//returns true if there is a prop that is equivalent to the prop (the odds and ID can be different but this should still match)
export function equivalentProp(propOne: BettingProp, propTwo: BettingProp): boolean {
    //TODO: clean up typescript errors
    //@ts-ignore 
    if((propOne.entityInfo.displayName == propTwo.entityInfo.displayName)&&
        (propOne.bettingBetType==propTwo.bettingBetType)&&
        (propOne.value==propTwo.value)){
            return true;
    }else{
        return false;
    }
}

//returns true if there is a prop equivalent to prop newBetttingProp in the list
export function equivalentPropInList(newBettingProp: BettingProp, existingProps: BettingProp[]): boolean {
    //TODO: clean up typescript errors
    //@ts-ignore 
    var equivalentProps = existingProps.filter(bp => {
        //@ts-ignore
        if(bp.entityInfo.displayName != newBettingProp?.entityInfo.displayName){
            return false
        }
        // if(bp.lastName != newBettingProp?.lastName){
        //     return false
        // }
        // if(bp.teamName != newBettingProp?.teamName){
        //     return false
        // }
        if(bp.bettingBetType != newBettingProp?.bettingBetType){
            return false
        }
        if(bp.value != newBettingProp?.value){
            return false
        }

        return true
    });
    if(equivalentProps.length == 0){
        return true;
    }
    return false;
}
