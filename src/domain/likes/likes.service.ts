// src/likes/likes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from './like.schema';
import { Quote } from '../quotes/quote.schema';
import { LikeResponseDto } from './dtos/like-response.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<Like>,
    @InjectModel(Quote.name) private readonly quoteModel: Model<Quote>,
  ) {}

  async toggleLike(userId: Types.ObjectId,
      quoteId: Types.ObjectId): Promise<LikeResponseDto> {
    
    const quote = await this.quoteModel.findById(quoteId);
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${quoteId} not found`);
    }

    const existingLike = await this.likeModel.findOne({ userId, quoteId });

    if (existingLike) {
      await existingLike.deleteOne();
      await this.quoteModel.findByIdAndUpdate(quoteId, { $inc: { likeCount: -1 } });
    } else {
      await this.likeModel.create({ userId, quoteId });
      await this.quoteModel.findByIdAndUpdate(quoteId, { $inc: { likeCount: 1 } });
    }

    const updatedQuote = await this.quoteModel.findById(quoteId, { likeCount: 1 });

    return {
      likeCount: updatedQuote.likeCount,
    };
  }
}
