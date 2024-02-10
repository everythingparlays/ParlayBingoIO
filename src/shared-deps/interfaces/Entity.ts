
export type  Entity = PlayerEntity | TeamEntity;
export type EntityTypes = "PlayerEntity" | "TeamEntity";
const entityTypesList: EntityTypes[] = ["PlayerEntity","TeamEntity"];
export type InjuryStatusTypes = "Injured" | "Tentative" | "Good";
const injuryStatusTypesList: InjuryStatusTypes[] = ["Injured","Tentative","Good"];

export const entityTypeValidator = (inputVar: any): inputVar is EntityTypes =>{
    return ((entityTypesList.includes(inputVar)));
}

export const injuryStatusTypeValidator = (inputVar: any): inputVar is InjuryStatusTypes => {
    return ((injuryStatusTypesList.includes(inputVar)));
}


export interface SharedEntityFields {
    _id?: string;
    displayName: string; //name of player or team
    sport: string; 
    position: string; //will be Team if i
    photoUri: string; //uri for specific team or player
    teamName: string;
    type: string;
}

export interface PlayerEntity extends SharedEntityFields  { 
    type: "Player";
    PlayerId: string; //sportsdataio playerId
    position: string;
    injuryStatus: InjuryStatusTypes;
    depthChartOrder: number; //denotes which string the player is in ex: 1 for starting player
}

export interface TeamEntity extends SharedEntityFields {
    type: "Team";
    TeamId: string; //sportsdataio teamId
}

//displayName: string; //name of player or team
//position: string; //
//injuryStatus: string; 
//photoUri: string; //uri for specific team or player

//q: what should I name an intereface that can support both teams and players
//a: 