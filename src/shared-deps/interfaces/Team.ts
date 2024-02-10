//Interface with team information, can be used for betting on teams

import Sport from "./Sport";
//TODO: Depreciate this use Entity structure instead
export interface Team { 
    _id?: string;
    sport: Sport; 
}