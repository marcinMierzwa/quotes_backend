import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common/common.module';
import { DatabaseModule } from './database/database/database.module';
import { CharactersModule } from './domain/characters/characters.module';
import { MoviesModule } from './domain/movies/movies.module';
import { QuotesModule } from './domain/quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    CommonModule,
    QuotesModule,
    DatabaseModule,
    MoviesModule,
    CharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
