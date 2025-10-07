import { BettingProp, listOfBettingPropsHasMultipleTeams, propsAreFromTheSameTeam } from "./BettingProp";
import { Contest } from "./Contest";
import { Entity, isStarEntity } from "./Entity";
import { User } from "./User";
import { Types } from "mongoose";

export type BoardPositionsTypes = "topLeft" | "topMiddle" | "topRight" |
                                "middleLeft" | "middleMiddle" | "middleRight" |
                                "bottomLeft" | "bottomMiddle" | "bottomRight";
export const boardPositionsList: BoardPositionsTypes[] = ["topLeft","topMiddle","topRight",
                                                        "middleLeft","middleMiddle","middleRight",
                                                        "bottomLeft","bottomMiddle","bottomRight"];
export const boardPositionsListOrderedBySafestToRiskiestSlots: BoardPositionsTypes[] = ["middleMiddle", "topLeft","topRight","bottomRight", "bottomLeft",
"middleLeft","middleRight", "bottomMiddle", "topMiddle"];

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
    parlaysHit?: number;
    remainingParlays?: number;
    boardRank?: number;
    //new
    transactionId: Types.ObjectId | null;
    numEntries: number;
    settled: boolean; //if contest has been scored
    earnings: number;  // amount won from the contest
    createdAt?:Date;
    updatedAt?:Date;
};

export interface SmallBoardDisplayProps extends Board {
    appUserId: string | undefined ; //user Id of the user using the app
    entryFee: number;
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

// Define your filter function
function isConflictingProp(newBettingProp: BettingProp, existingProp: BettingProp): boolean {
    //@ts-ignore
    if(existingProp.entityInfo.displayName != newBettingProp?.entityInfo.displayName){
        return false;
    }
    if(existingProp.bettingBetType != newBettingProp?.bettingBetType){
        return false;
    }
    return true;
}

//returns if there is a prop in the list that would stop the addition of new props, returns true or false 
export function returnConflictingPropsInList(newBettingProp: BettingProp, existingProps: BettingProp[]): BettingProp[] {
    var conflictingProps = existingProps.filter(bp => isConflictingProp(newBettingProp, bp));
    return conflictingProps;
}
//returns the position of conflicting props, will return topLeft if no prop is found
export function getConflictingPropPositions(newBettingProp: BettingProp, existingBoard: Board): BoardPositionsTypes[] {
    
    const conflictingPropPositions: BoardPositionsTypes[] = [];
    const conflictingProps = returnConflictingPropsInList(newBettingProp,listBoardProps(existingBoard));
    //console.log("conflicting", conflictingProps);
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
    // @ts-ignore
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

export const getNumberOfPropsInBoard = (singleBoard: Board | null): number => {
    if (!singleBoard) return 0;
    return listBoardProps(singleBoard).length;
}


export const boardHasMultipleTeams = (singleBoard: Board | null): boolean => {
    if (!singleBoard) return false;
    const boardProps = listBoardProps(singleBoard);
    return listOfBettingPropsHasMultipleTeams(boardProps);
};



export interface FillBoardProps {
    existingBoard: Board;
    availableProps: BettingProp[];
    desiredRisk: {min: number; max: number;};
    preferredTeams:string[];
    favorStarPlayers: boolean;
}


const _getPropsToFillBoard = (props: FillBoardProps): BettingProp[] => {
    const debug = false;
    const log = (...content: any[]) => {
        if(debug){
            console.log(...content);
        }
    }
    console.log("Number of props coming in:",props.availableProps.length)
    if(props.availableProps.length <= 0){
        return [];
    }
    var numPropsNeeded: number = boardPositions.length - getNumberOfPropsInBoard(props.existingBoard)
    var propsOrderedByMultiplier: BettingProp[] = [...props.availableProps].filter(Boolean).sort((a, b) => a.multiplier - b.multiplier);
    const mapRiskToMultiplier = (risk: number, minRisk: number, maxRisk: number, minMultiplier: number, maxMultiplier: number): number => {
        return ((risk - minRisk) / (maxRisk - minRisk)) * (maxMultiplier - minMultiplier) + minMultiplier;
    }
    const minMultiplier = propsOrderedByMultiplier[0].multiplier;
    const maxMultiplier = propsOrderedByMultiplier[propsOrderedByMultiplier.length - 1].multiplier;
    const mappedMinRisk = mapRiskToMultiplier(props.desiredRisk.min, 1, 100, minMultiplier, maxMultiplier);
    const mappedMaxRisk = mapRiskToMultiplier(props.desiredRisk.max, 1, 100, minMultiplier, maxMultiplier);
    if(propsOrderedByMultiplier.length < 1) return [];

    let existingProps: BettingProp[] = listBoardProps(props.existingBoard)
    let selectedBettingProps: BettingProp[] = []
    var validBettingProps: BettingProp[]  = propsOrderedByMultiplier.filter(bp => (0 >= returnConflictingPropsInList(bp, existingProps).length));
    log("Valid Props Length:", validBettingProps.length)
    while((numPropsNeeded > 0)&&(validBettingProps.length > 0)){
        log("Valid Props:", validBettingProps)
        //if it is the last prop, make sure a prop from another team is added
        let propsInBoard = existingProps.concat(selectedBettingProps);
        if((numPropsNeeded==1)&&(!listOfBettingPropsHasMultipleTeams(propsInBoard))){
            validBettingProps = validBettingProps.filter(bettingProp => !propsAreFromTheSameTeam(propsInBoard[0], bettingProp))
        }
        //Check against Applied Filters
        let propsThatFitRiskProfile = validBettingProps.filter((bettingProp: BettingProp) => 
            bettingProp.multiplier >= mappedMinRisk && bettingProp.multiplier <= mappedMaxRisk
        );

        let propsWithPreferredTeams: BettingProp[] = [];
        if(props.preferredTeams.length > 0){
            propsWithPreferredTeams = validBettingProps.filter((bettingProp: BettingProp) => 
                // @ts-ignore
                props.preferredTeams.includes(bettingProp.entityInfo.teamName)
            );
        }else{
            propsWithPreferredTeams = validBettingProps;
        }

        let propsWithStarPlayersOrEverybody = validBettingProps;
        if(props.favorStarPlayers){
            propsWithStarPlayersOrEverybody = validBettingProps.filter((bettingProp: BettingProp) =>
        
                isStarEntity(bettingProp.entityInfo as Entity)
            )
        }

        let commonProps = propsThatFitRiskProfile.filter(bettingProp => 
            propsWithPreferredTeams.includes(bettingProp) && propsWithStarPlayersOrEverybody.includes(bettingProp) && propsThatFitRiskProfile.includes(bettingProp)
        );
        //Choose a Random Prop
        log("Common Props:",commonProps)
        if(commonProps.length > 0){
            let randomIndex = Math.floor(Math.random() * commonProps.length);
            let randomProp = commonProps[randomIndex];
            selectedBettingProps.push(randomProp);
            propsInBoard = existingProps.concat(selectedBettingProps);
        }else{
            return selectedBettingProps;
            //TODO: Add logic to make the amount of props bigger if the filters are to stringent here
        }
        //Update all Values
        propsInBoard = existingProps.concat(selectedBettingProps);
        numPropsNeeded = boardPositions.length - propsInBoard.length
        validBettingProps  = validBettingProps.filter(bp => (0 >= returnConflictingPropsInList(bp, propsInBoard).length));
    }
    return selectedBettingProps;
}


export const createFilledBoard = (props: FillBoardProps): Board => {
    const newBoard = {...props.existingBoard};

    const choosenProps = _getPropsToFillBoard(props);
    //console.log(choosenProps.length," Choosen Props: ",choosenProps)
    var orderedPropsHighToLowMult = choosenProps.sort((a, b) => b.multiplier - a.multiplier);

    for (let index = 0; index < boardPositionsListOrderedBySafestToRiskiestSlots.length; index++) {
        let currentBoardPosition = (boardPositionsListOrderedBySafestToRiskiestSlots[index])
        let existingProp: null | BettingProp = props.existingBoard[currentBoardPosition]
        //if tile is empty, fill them with
        if(existingProp==null){
            let poppedBettingProp = orderedPropsHighToLowMult.pop();
            if(poppedBettingProp){
                newBoard[currentBoardPosition] = poppedBettingProp;
            }
        }
    }
    return newBoard;
}

