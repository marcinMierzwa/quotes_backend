import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class Character extends Document {

    @Prop()
    name: string;
    @Prop()
    wikiUrl: string;
    @Prop()
    race: string;
    @Prop()
    birth: string;
    @Prop()
    gender: string;
    @Prop()
    death: string;

}

export const CharacterSchema = SchemaFactory.createForClass(Character);