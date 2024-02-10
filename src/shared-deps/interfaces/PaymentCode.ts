import { ObjectId } from "mongoose";

export interface CreatePaymentCode {
    numEntries: number;
    contestId: ObjectId;
}

export interface PaymentCode {
    //mongodb genertated
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    //create function generated
    code: string;
    //Admin input
    numEntries: number
    //Modified when user enters
    contestId: ObjectId;
    boardId?: ObjectId;
    userId?: ObjectId;
    //Indicates if the code has been consumed
    used: boolean;
}