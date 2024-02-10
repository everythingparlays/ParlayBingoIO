import { Board } from "./Board";
import { Contest } from "./Contest";


export interface BoardCard { 
    contestId:string;
    contestInfo: Contest;
    boardsEntered: Board[]; //list of the boards entered in the contest  
}