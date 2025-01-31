import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class GetQuotesDto {
    @IsInt()
    @IsOptional()
    readonly skip?: number;
  
    @IsInt()
    @IsOptional()
    readonly limit?: number;

    @IsString()
    @MinLength(3)
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    readonly search?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    readonly movie?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    readonly character?: string;
  }
  
