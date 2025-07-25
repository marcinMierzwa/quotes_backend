import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dtos/create-quotes.dto';
import { GetQuotesDto } from './dtos/get-quotes.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optiolnal-jwt-auth-guard/optiona-jwt.guard';
import { GetOneDto } from './dtos/get-one.dto';

// http://localhost:3000/quotes?limit=3&skip=0&movie=The Two Towers&character=Gandalf

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getAll(@Query() getQuotesDto: GetQuotesDto, @Request() req) {  
    const userId = req.user ? req.user.id : undefined;      
    return this.quotesService.getAll(getQuotesDto, userId);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':quoteId')
  async getOne(@Param() params:GetOneDto, @Request() req) {
    const userId = req.user ? req.user.id : undefined;      
    const quoteId = params.quoteId;
    return await this.quotesService.getOne(quoteId, userId);
  }
}