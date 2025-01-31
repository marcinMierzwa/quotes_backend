import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    
  @IsString()
  name: string;

  @IsNumber()
  runtimeInMinutes: number;

  @IsNumber()
  budgetInMillions: number;

  @IsNumber()
  boxOfficeRevenueInMillions: number;

  @IsNumber()
  academyAwardNominations: number;

  @IsNumber()
  academyAwardWins: number;

  @IsNumber()
  rottenTomatoesScore: number;

}
