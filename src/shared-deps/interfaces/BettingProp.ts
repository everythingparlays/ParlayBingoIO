import { BetEvent } from "./BetEvent";
import { Entity } from "./Entity";
import Sport from "./Sport";
import { Types } from "mongoose";

export type ConsensusOutcomeTypes = "Hit" | "Miss" | "Void" | null;
export const consensusOutcomeTypesList: ConsensusOutcomeTypes[] = ["Hit","Miss","Void",null];
export type OutcomeTypes = "Over" | "Under" | "Manual" ;
export const outcomeTypesList: OutcomeTypes[] = ["Over","Under","Manual"];

export const consensusOutcomeTypeValidator = (inputVar: any): inputVar is ConsensusOutcomeTypes => {
    if(!inputVar) return true;
    return ((consensusOutcomeTypesList.includes(inputVar)));
}

export const outcomeTypeValidator = (inputVar: any): inputVar is OutcomeTypes => {
    return ((outcomeTypesList.includes(inputVar)));
}

//see documentation/sportsdata_io_bettiing_types.png for more info on prop meanings
//q: below is my betting prop interface, my mongo db database has the same structure, how would i filter props by sport, can I filterr based off of 

export interface BettingProp { 
    _id?: string;
     //this is the ID for our PB game information
    betEventId: Types.ObjectId | BetEvent | null, //_id used for the game information that we store
    //Game -> Event -> Market -> Outcome
    // ID's Dont worry about these until backend automated backend integration
    BettingEventID: number; //sportsdataa.io provided field 
    BettingMarketID: number; //sportsdata.io provided field 
    BettingOutcomeID: number; //sportsdata.io provided field 

    //Betting type, shared attributes
    //bettingEvent: string; // Bulls @ Nets
    bettingBetType: string; //Total Rebounds, Rushing Yards, Total Points, Money Line
    bettingPeriodType: string; //Full Game | First quarter... (will always be full game for now)
    
    //Player or Team Info
    entityInfo: Types.ObjectId | Entity | null; //player info for player props
    //Betting details
    value: number; //+35 | -4 (can be a game spread or a points, rebounds etc) 
    //^^^if team wins put a 1 in this field if they loose put 0
    alternateValue?: string; //overide for what is displayed on Prop Card
    multiplier: number; //parlay bingo multiplier
    outcomeType: OutcomeTypes; //over, under, home, away etc.
    consensusOutcome: ConsensusOutcomeTypes; //these will change for real integration
    progressValue: number; // if it is a player prop this shows in game how far the player is
    isFinal: boolean; //shows if this prop has been resulted or not

    showProp: boolean; //Show or hide prop from users
}

export interface CreateBettingPropParams {
    betEventId: string;
    entityInfo: string;
    bettingBetType: string;
    bettingPeriodType: "Full Game";
    value: number;
    multiplier: number;
    outcomeType: OutcomeTypes;
    consensusOutcome: ConsensusOutcomeTypes;
    progressValue: number;
    isFinal: boolean;
    showProp: boolean;
}

export interface UpdateBettingPropParams {
    _id: string;
    bettingBetType: string;
    value: number; 
    multiplier:Number;
    outcomeType: OutcomeTypes;
    showProp: boolean;
}

export function checkAlternateValue(checkBettingProp: BettingProp) {
    if(checkBettingProp.alternateValue){
        return(checkBettingProp.alternateValue)
    }else{
        return(checkBettingProp.value)
    }
}