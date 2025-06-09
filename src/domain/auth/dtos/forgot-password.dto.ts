import { IsEmail, MaxLength } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MaxLength(50, { message: 'Email must not exceed 50 characters' })
  email: string;
}
