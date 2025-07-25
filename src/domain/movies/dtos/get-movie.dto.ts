
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from "class-transformer";


export class GetMovieDto {
  @IsNotEmpty() 
  @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
  movieId: Types.ObjectId;
}