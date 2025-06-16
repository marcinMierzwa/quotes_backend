import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common/common.module';
import { DatabaseModule } from './database/database/database.module';
import { CharactersModule } from './domain/characters/characters.module';
import { MoviesModule } from './domain/movies/movies.module';
import { QuotesModule } from './domain/quotes/quotes.module';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { MailModule } from './mail/mail.module';
import { FavouritesModule } from './domain/favourites/favourites.module';

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
    UsersModule,
    MailModule,
    AuthModule,
    FavouritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}