import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}


  @Get()
  getAllMoviesName() {
    return this.moviesService.getAllMoviesName();
  }


  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string ) {
    return this.moviesService.findOne(id);
  }

}
