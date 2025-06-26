import { Types } from "mongoose";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class AddFavouriteQuoteDto {
  @IsNotEmpty() 
  @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
  quoteId: Types.ObjectId;
}

