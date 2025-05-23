import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class LoginDto {
    
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @MaxLength(50, { message: 'Email must not exceed 50 characters' })
    email: string;
  
    @IsOptional()
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(50, { message: 'Password must not exceed 50 characters' })
    @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    )
    password?: string;
  
  }
  