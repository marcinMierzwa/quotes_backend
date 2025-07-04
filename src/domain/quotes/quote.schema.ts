import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
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

  @Prop({ type: Number, default: 0 })
  likeCount: number;

}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
