import { Types } from "mongoose"

export type AuthJwtPayload = {
  sub: Types.ObjectId; // User ID
};