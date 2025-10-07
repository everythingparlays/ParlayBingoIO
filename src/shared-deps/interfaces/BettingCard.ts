import { BetEvent } from "./BetEvent";
import { Entity } from "./Entity";
import Sport from "./Sport";

//TODO: Take a look at if this interface should be a shared interfae
//see documentation/sportsdata_io_bettiing_types.png for more info on prop meanings
export interface BettingCard { 

    betEventId: string | null, //_id used to match a card to its associated betEvent
    betEvent: BetEvent | null,
    entityInfo: Entity | null,
    //Betting type, shared attributes
    sport: Sport;
    bettingEvent: string; // Bulls @ Nets
    bettingMarketType: "GameLine" | "Player Prop"; //team vs player prop this will need to be update for individual
    photoUri: string; //uri for specific team or player
    eventStartTime: Date; //Time prop cannot be changed afterr
    //status
    IsInPlay: boolean;
    //Props if "GameLine" 
    teamName: string;
    //Props if "Player Prop"
    firstName: string;
    lastName: string;
    position: string;
    injuryStatus: string;
    cardHeading: string;
}