import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose"; 


@Schema({
    timestamps: true,
    versionKey: false,
})
export class VerifyToken extends Document {
    @Prop( {required: true} )
    userId: Types.ObjectId;

    @Prop( {required: true , unique: true} )
    token: string;

    @Prop( {default: false} )
    used: boolean;

}

export const VerifyTokenSchema = SchemaFactory.createForClass(VerifyToken);