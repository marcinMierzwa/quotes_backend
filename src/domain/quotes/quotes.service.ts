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
    const { limit, skip, search, movie, character, sort } = getQuotesDto;
    const filter: any = {};
    if (search) {
      filter.dialog = new RegExp(`^${search}`, 'i');
    }
    if (movie) {
      filter.movie = new RegExp(`^${movie}$`, 'i');
    }
    if (character) {
      filter.character = new RegExp(`^${character}$`, 'i');
    }

    let sortOrder: any = {}; 
    if (sort === 'asc') {
      sortOrder = { dialog: 1 }; 
    } else if (sort === 'desc') {
      sortOrder = { dialog: -1 };
    } else if (sort === 'mostLikes') {
      sortOrder = { likes: -1, dialog: 1 }; 
    } else if (sort === 'leastLikes') {
      sortOrder = { likes: 1, dialog: 1 }; 
    } else {
      sortOrder = { dialog: 1 };
    }
    // console.log('Filter:', filter); // jaki filtr jest tworzony
    // console.log('Skip:', skip, 'Limit:', limit, 'Sort:', sort);


    const quotes = await this.quoteModel
      .find(filter)
      .sort(sortOrder)
      .skip(skip * limit)
      .limit(limit)
      .exec();
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
