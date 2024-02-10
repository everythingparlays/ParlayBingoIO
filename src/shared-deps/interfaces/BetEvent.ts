//Add new event interfaces here, make sure to add to the models file on the backend
export type BetEvent = TeamBetEvent | IndividualBetEvent;

//add event type to this type, use same name as above
export type BetEventTypes = "TeamBetEvent" | "IndividualBetEvent";
//add event type to this list, use same name as above
const betEventTypesList: BetEventTypes[] = ["TeamBetEvent", "IndividualBetEvent"];

export type StatusTypes = "Final" | "Scheduled" | "InProgress" ;

const statusTypesList: StatusTypes[] = ["Final","Scheduled","InProgress"];

export const betEventTypeValidator = (inputVar: any): inputVar is BetEventTypes => {
    return ((betEventTypesList.includes(inputVar)));
}

export const statusTypeValidator = (inputVar: any): inputVar is StatusTypes => {
    return ((statusTypesList.includes(inputVar)));
}


/******************Shared fields for the Event Types *********/
export interface SharedBetEventFields {
    _id?: string;
    GameID: number; //corresponds to the sportsdata.io GameID
    status: StatusTypes;
    sport: string;
    eventTime: Date;
    bettingEvent: string; // Bulls @ Nets
    scoreAvailable: boolean;
    televisionChannel: string | null; //tv channel with the game
    photoUri: string;
    type: string;//used to discriminate between types of event Details
}

/********************Event Types  *****************************/
export interface TeamBetEvent extends SharedBetEventFields {
    type: 'TeamBetEvent'; //discriminator override
    awayTeam: string;
    homeTeam: string;
    awayTeamLogo: string;
    homeTeamLogo: string;
    eventDetails?: TeamBetEventDetails;
}

export interface IndividualBetEvent extends SharedBetEventFields {
    type: 'IndividualBetEvent'; //discriminator override
    eventDetails? : IndividualBetEventDetails;
}

/************************Event Detail Schemas *****************/
export interface TeamBetEventDetails {
    awayTeamId: number; //These ID's are sport specific
    homeTeamId: number; 
    awayTeamScore: number;
    homeTeamScore: number;
    gamePeriod: number;
    timeRemainingMinutes: number;
    timeRemainingSeconds: number;
}

export interface IndividualBetEventDetails {
    scores: PlayerScore[];
    
}

export interface PlayerScore {
    playerName: string;
    standing: number;
    points: number;
}

//returns a list of the unique sports that are in a contest
export function getIncludedSports(betEventsList: BetEvent[]):string[] {
    const allOfTheSports: string[] = betEventsList.map(event => event.sport);
    const uniqueSports: string [] = [...new Set(allOfTheSports)];
    return uniqueSports;
}