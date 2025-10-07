import mongoose from "mongoose";
import { User } from "./User";

interface IRelationship {
    user1: mongoose.Types.ObjectId | User;
    user2: mongoose.Types.ObjectId | User;
    type: 'Added' | 'Deleted';
    createdAt: Date;
}

export { IRelationship };