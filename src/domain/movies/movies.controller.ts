import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('')
  async getAll() {
    const movies = await this.moviesService.getAll();
    return {
      data: movies
    }
  }


  @Get('movie-name')
  async getAllMovieName() {
    return await this.moviesService.getAllMovieName();
  }


  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: string ) {
    return await this.moviesService.findOne(id);
  }

}
