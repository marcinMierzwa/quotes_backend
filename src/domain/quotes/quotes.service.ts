import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDto } from './dtos/create-quotes.dto';
import { GetQuotesDto } from './dtos/get-quotes.dto';
import { Quote } from './quote.schema';

@Injectable()
export class QuotesService {
    constructor(@InjectModel(Quote.name) private quoteModel: Model<Quote>) {}

    create(createQuoteDto: CreateQuoteDto) {
      return 'This action adds a new quote';
    }
  
    async findAll(getQuotesDto: GetQuotesDto) {
      const { limit = 3, skip = 0, search } = getQuotesDto;
      const filter: any = {};
    
      if (search) {
        filter.dialog = new RegExp(`^${search}`, 'i');
          }
      console.log('Filter:', filter); // Wyświetli, jaki filtr jest tworzony
  console.log('Skip:', skip, 'Limit:', limit); 
    
      const quotes = await this.quoteModel.find(filter).skip(skip * limit).limit(limit);
      const total = await this.quoteModel.countDocuments(filter);
      const message = total === 0 ? 'No results found' : 'success';
      return {
        data: quotes,
        message: message,
        pageIndex: getQuotesDto.skip,
        pageSize: limit,
        totalItems: total,
      };
    }
  
    async findOneById(id: string) {
      return await this.quoteModel.findById(id);
    }
  }
