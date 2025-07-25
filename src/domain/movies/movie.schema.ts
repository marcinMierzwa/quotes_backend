import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Movie extends Document {
  
  @Prop()
  name: string;

  @Prop()
  description: string;
  
  @Prop()
  imageUrl: string;

  @Prop()
  releaseDate: string;
  
  @Prop()
  directedBy: string;

  @Prop()
  produceddBy: string;

  @Prop()
  musicBy: string;

  @Prop()
  productionCompanies: string;

  @Prop()
  distributedBy: string;

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