import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { AddFavouriteQuoteDto } from './dtos/add-favourite-quote.dto';
import { use } from 'passport';

@UseGuards(JwtAuthGuard)
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  //Get Favourites Quotes 'http://localhost:3000/favourites'
    @Get()
    async getFavouritesQuotes(@Req() req) {
      const userId = req.user._id
      const favQuotes = await this.favouritesService.getFavouritesQuotes(userId);
      const data = favQuotes.favouritesQuotes;
      return data;
    }

  //Add Favourite Quote 'http://localhost:3000/favourites/add'
    @Post('add')
    async addFavouriteQuote(@Req() req, @Body() body: AddFavouriteQuoteDto) {
      const userId = req.user.id;
      const quoteId = body.quoteId;
      await this.favouritesService.addFavouriteQuote(userId, quoteId);
      return {
        message: 'quote added successfully'
      };
    }
}
