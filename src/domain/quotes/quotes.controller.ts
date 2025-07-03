import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dtos/create-quotes.dto';
import { GetQuotesDto } from './dtos/get-quotes.dto';

// http://localhost:3000/quotes?limit=3&skip=0&movie=The Two Towers&character=Gandalf

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @Get()
  getAll(@Query() getQuotesDto: GetQuotesDto) {        
    return this.quotesService.getAll(getQuotesDto);
  }

  @Get(':id')
   findOneById(@Param('id') id: string) {
     return  this.quotesService.findOneById(id);
  }
}