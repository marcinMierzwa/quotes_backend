import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateQuoteDto } from './dtos/create-quotes.dto';
import { GetQuotesDto } from './dtos/get-quotes.dto';
import { Quote } from './quote.schema';
import { Like } from '../likes/like.schema';
import { PaginatedQuotesResponseDto } from './dtos/paginated-quotes-response.dto';
import { QuoteResponseDto } from './dtos/quote-response.dto';
import { GetOneResponseDto } from './dtos/get-one.response.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<Quote>,
    @InjectModel(Like.name) private likeModel: Model<Like>
) {}

  create(createQuoteDto: CreateQuoteDto) {
    return 'This action adds a new quote';
  }

  async getAll(getQuotesDto: GetQuotesDto, userId?: string): Promise<PaginatedQuotesResponseDto> {
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
    } else {
      sortOrder = { dialog: 1 };
    }

    const quotes = await this.quoteModel
      .find(filter)
      .sort(sortOrder)
      .skip(skip * limit)
      .limit(limit)
      .lean()
      .exec();

    const totalItems = await this.quoteModel.countDocuments(filter);
    
    if (quotes.length === 0) {
      return { data: [], totalItems: 0, pageIndex:skip, pageSize:limit,};
    }

    let likedQuoteIds = new Set<string>();

    if (userId) {
      const quoteIds = quotes.map((q) => q._id);

      const userLikes = await this.likeModel
        .find({
          userId: userId, 
          quoteId: { $in: quoteIds }, 
        })
        .select('quoteId') 
        .lean()
        .exec();
      
      likedQuoteIds = new Set(userLikes.map((like) => like.quoteId.toString()));
    }

    const enrichedItems: QuoteResponseDto[] = quotes.map((quote) => {
      const isLiked = likedQuoteIds.has(quote._id.toString());
      
      return {
        _id: quote._id.toString(), 
        dialog: quote.dialog,
        movie: quote.movie,
        character: quote.character,
        movieId: quote.movieId,
        characterId: quote.characterId,
        backgroundUrl: quote.backgroundUrl,
        likeCount: quote.likeCount,
        isLikedByUser: isLiked,
        createdAt: quote.createdAt.toISOString(),
        updatedAt: quote.updatedAt.toISOString(),
      };
    });

    return {
      data: enrichedItems,
      pageIndex: skip, 
      pageSize: limit,
      totalItems: totalItems,
    };
  }

  // shared
  async getOne(quoteId: Types.ObjectId, userId?: Types.ObjectId): Promise<QuoteResponseDto> {
    const quote = await this.quoteModel.findById(quoteId).lean().exec();

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${quoteId} not found.`);
    }

    let isLiked = false;
    if (userId) {
      const like = await this.likeModel.findOne({ userId, quoteId }).lean().exec();
      isLiked = !!like; 
    }
    
    return {
      _id: quote._id.toString(),
      dialog: quote.dialog,
      movie: quote.movie,
      character: quote.character,
      movieId: quote.movieId,
      characterId: quote.characterId,
      backgroundUrl: quote.backgroundUrl,
      likeCount: quote.likeCount,
      isLikedByUser: isLiked, 
      createdAt: quote.createdAt.toISOString(),
      updatedAt: quote.updatedAt.toISOString(),
    };
  }
}

