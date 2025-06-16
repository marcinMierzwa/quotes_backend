import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class FavouriteQuote extends Document {

     _id: Types.ObjectId;

    @Prop( {required: true} )
    userId: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    favouritesQuotes: Types.ObjectId[];

}

export const FavouriteQuoteSchema = SchemaFactory.createForClass(FavouriteQuote);