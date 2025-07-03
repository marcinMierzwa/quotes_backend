import { IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  dialog: string;

  @IsString()
  movie: string;

  @IsString()
  character: string;

  @IsString()
  movieId: string;

  @IsString()
  characterId: string;

  @IsString()
  backgroundUrl: string;

}
