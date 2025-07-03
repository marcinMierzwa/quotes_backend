import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class GetQuotesDto {
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    readonly skip?: number = 0;
  
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    readonly limit?: number = 3;

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

    @IsString()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    readonly sort?: string = 'asc';
  }
  
