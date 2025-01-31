import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from './movie.schema';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

    async create(createMovieDto: CreateMovieDto) {
        const movie = await this.movieModel.create(createMovieDto);
        return {
          movie,
          message: "movie created successful"
        }
      }

      async findOne(id: string) {
        const movieById = await this.movieModel.findById(id);
        return {
          movieById
        }
      }
    
    }
