import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"; 
import * as argon2 from 'argon2';

@Schema({
    versionKey: false,
    timestamps: true
})
export class User extends Document {

    @Prop( { required: true, unique: true} )
    email: string;

    @Prop (  {required: true} )
    password: string;

    @Prop (  {default: 'local'} )
    authStrategy: string;

    @Prop (  {default: false} )
    isEmailAdressConfirmed: boolean;

    @Prop ()
    googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    const user = this as User;
  
    if (!user.isModified('password')) {
      return next(); 
    }
  
    try {
      user.password = await argon2.hash(user.password);
      next();
    } catch (error) {
      next(error);
    }
  });