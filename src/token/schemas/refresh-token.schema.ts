import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class RefreshToken {
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true })
  hashedToken: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
