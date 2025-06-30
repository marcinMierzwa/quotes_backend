import { Types } from "mongoose";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class AddRemoveFavouriteQuoteDto {
  @IsNotEmpty() 
  @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
  quoteId: Types.ObjectId;
}

