import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './quote.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Quote.name,
      schema: QuoteSchema
    }
  ])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
