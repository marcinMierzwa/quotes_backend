import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GetMovieDto } from './dtos/get-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('')
  async getAll() {
    const movies = await this.moviesService.getAll();
    return {
      data: movies,
    };
  }

  @Get('movie-name')
  async getAllMovieName() {
    return await this.moviesService.getAllMovieName();
  }

  @Get(':movieId')
  async getOne(@Param() params: GetMovieDto) {
    const movieId = params.movieId;
    const movie = await this.moviesService.getOne(movieId);
    return {
      data: movie
    }
  }
}
