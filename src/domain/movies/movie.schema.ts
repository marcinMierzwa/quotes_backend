import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    versionKey: false,
    timestamps: true
})
export class Movie extends Document {
  @Prop()
  name: string;
  @Prop()
  runtimeInMinutes: number;
  @Prop()
  budgetInMillions: number;
  @Prop()
  boxOfficeRevenueInMillions: number;
  @Prop()
  academyAwardNominations: number;
  @Prop()
  academyAwardWins: number;
  @Prop()
  rottenTomatoesScore: number;
}
export const MovieSchema = SchemaFactory.createForClass(Movie);