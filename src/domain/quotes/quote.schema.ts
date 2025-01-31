import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true,
    versionKey: false
})
export class Quote extends Document {

    @Prop()
    dialog: string;
    
    @Prop()
    movie: string;

    @Prop()
    character: string;

    @Prop()
    movieId: string;

    @Prop()
    characterId: string;

    @Prop()
    backgroundUrl: string;


    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    likes: Types.ObjectId[];
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);