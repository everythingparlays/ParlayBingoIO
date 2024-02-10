import { ObjectId } from "mongoose";
import { User } from "./User";

export type AttendantCallStatusTypes = "Open" | "In-progress" | "Closed";
export const attendantCallStatusTypesList: AttendantCallStatusTypes[] = ["Open","In-progress","Closed"];

export const attendantCallStatusTypeValidator = (inputVar: any): inputVar is AttendantCallStatusTypes => {
    return attendantCallStatusTypesList.includes(inputVar);
}


export interface CreateAttendantCall {
    _id?: string;
    userInfo: ObjectId;//This should alway be an Id
    locationInfo: string;
    details: string;
    contestId?: ObjectId;
    boardId?: ObjectId;
}


export interface AttendantCall {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    //(above) mongoose generated
    userInfo: ObjectId; //This will probably be populated
    locationInfo: string;
    details: string;
    status: AttendantCallStatusTypes;
    contestId?: ObjectId;
    boardId?: ObjectId;
}