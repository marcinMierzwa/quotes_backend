import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'reset-token',
  expireAfterSeconds: 30,
})
export class ResetToken extends Document {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop()
  createdAt: Date;
}

export const ResetTokenSchema = SchemaFactory.createForClass(ResetToken);
