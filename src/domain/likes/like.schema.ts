import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Quote } from '../quotes/quote.schema';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Like extends Document {
    
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Types.ObjectId, ref: 'Quote', required: true })
  quoteId: Quote;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
LikeSchema.index({ userId: 1, quoteId: 1 }, { unique: true });