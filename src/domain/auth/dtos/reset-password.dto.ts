import { IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../../../validators/match.validator';

export class ResetPasswordDto {
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @Match('password', { message: 'Passwords do not match' }) 
    confirmPassword: string;
    
    @IsNotEmpty()
    token: string;
}