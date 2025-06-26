import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FavouriteQuote } from './favourite-quote.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FavouritesService {
    constructor(@InjectModel(FavouriteQuote.name)private favouriteQuoteModel: Model<FavouriteQuote>) {}

    async getFavouritesQuotes(userId: Types.ObjectId):  Promise<FavouriteQuote> {
        return await this.favouriteQuoteModel.findOne(userId);
    }

    async addFavouriteQuote(userId: Types.ObjectId, quoteId: Types.ObjectId): Promise<FavouriteQuote> {
    return await this.favouriteQuoteModel.findOneAndUpdate(
      { userId }, 
      { 
        $addToSet: { favouritesQuotes: quoteId } 
      },
      { 
        upsert: true, 
        new: true    
      }
    ).exec(); 
}
}
