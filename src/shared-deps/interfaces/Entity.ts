import Sport from "./Sport";

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
    showPhotoUri?: boolean;
}

export interface PlayerEntity extends SharedEntityFields  { 
    type: "PlayerEntity";
    PlayerId: string; //sportsdataio playerId
    position: string;
    injuryStatus: InjuryStatusTypes;
    depthChartOrder: number; //denotes which string the player is in ex: 1 for starting player
    jerseyNumber?: number | null;
}

export interface TeamEntity extends SharedEntityFields {
    type: "TeamEntity";
    TeamId: string; //sportsdataio teamId
}

//returns true if it is a star player or an entity
export const isStarEntity = (entity: Entity): boolean => {
  if (
    entity.type == "TeamEntity" ||
    (entity.type == "PlayerEntity" && [1, 2].includes(entity.depthChartOrder))
  ) {
    return true;
  }
  return false;
};