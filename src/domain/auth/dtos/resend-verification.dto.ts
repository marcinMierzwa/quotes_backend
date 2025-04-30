import { IsEmail } from 'class-validator';

export class ResendDto {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
}