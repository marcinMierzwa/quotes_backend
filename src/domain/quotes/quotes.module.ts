import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './quote.schema';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Quote.name,
      schema: QuoteSchema
    }
  ]),
  LikesModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
