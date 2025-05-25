import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class RefreshToken {
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ default: null })
  hashedToken: string | null;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
