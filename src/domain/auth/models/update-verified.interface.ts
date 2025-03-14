import { ObjectId } from "mongoose";

export interface UpadateVerified {
    _id: ObjectId;
    verified: boolean;
}