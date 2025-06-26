import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavouriteQuote, FavouriteQuoteSchema } from './favourite-quote.schema';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: FavouriteQuote.name,
        schema: FavouriteQuoteSchema
      }
  ])
  ]
})
export class FavouritesModule {}
