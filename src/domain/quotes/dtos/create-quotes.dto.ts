import { IsOptional, IsArray, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

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


  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  likes?: Types.ObjectId[];  
}
