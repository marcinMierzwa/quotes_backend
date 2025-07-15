import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './like.schema';
import { Quote, QuoteSchema } from '../quotes/quote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Like.name,
        schema: LikeSchema,
      },
      {
      name: Quote.name,
      schema: QuoteSchema
    }
    ]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
})
export class LikesModule {}
