import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FavouriteQuote } from './favourite-quote.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(FavouriteQuote.name)
    private favouriteQuoteModel: Model<FavouriteQuote>,
  ) {}

  async getFavouritesQuotes(userId: Types.ObjectId): Promise<FavouriteQuote> {
    const favourites = await this.favouriteQuoteModel.findOne({ userId: userId });
    if (!favourites) {
        return {
            _id: new Types.ObjectId(), 
            userId: userId,
            favouritesQuotes: []
        } as FavouriteQuote; 
    }

    return favourites;
  }

  async addFavouriteQuote(
    userId: Types.ObjectId,
    quoteId: Types.ObjectId,
  ): Promise<FavouriteQuote> {
    return await this.favouriteQuoteModel
      .findOneAndUpdate(
        { userId },
        {
          $addToSet: { favouritesQuotes: quoteId },
        },
        {
          upsert: true,
          new: true,
        },
      )
      .exec();
  }

  async removeFavouriteQuote(
    userId: Types.ObjectId,
    quoteId: Types.ObjectId,
  ): Promise<FavouriteQuote | null> {
    const filter = { userId: userId };
    const update = {
      $pull: { favouritesQuotes: quoteId },
    };
    const options = { new: true };
    return await this.favouriteQuoteModel
      .findOneAndUpdate(filter, update, options)
      .exec();
  }
}
