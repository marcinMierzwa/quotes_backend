import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { AddRemoveFavouriteQuoteDto } from './dtos/add-favourite-quote.dto';

@UseGuards(JwtAuthGuard)
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  //Get Favourites Quotes 'http://localhost:3000/favourites'
    @Get()
    async getFavouritesQuotes(@Req() req) {
      const userId = req.user.id; 
      const favQuotes = await this.favouritesService.getFavouritesQuotes(userId);
      return favQuotes.favouritesQuotes;
    }

  //Add Favourite Quote 'http://localhost:3000/favourites/add'
    @Post('add')
    async addFavouriteQuote(@Req() req, @Body() body: AddRemoveFavouriteQuoteDto) {
      const userId = req.user.id;
      const quoteId = body.quoteId;
      await this.favouritesService.addFavouriteQuote(userId, quoteId);
      return {
        message: 'Quote successfully added.'
      };
    }

    //remove Favourite Quote 'http://localhost:3000/favourites/remove'
    @Post('remove')
    async removeFavouriteQuote(@Req() req, @Body() body: AddRemoveFavouriteQuoteDto) {
      const userId = req.user.id;
      const quoteId = body.quoteId;
      await this.favouritesService.removeFavouriteQuote(userId, quoteId);
      return {
        message: 'Quote successfully removed.'
      };
    }

}
