import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie } from './movie.schema';
import { GetMovieResponseDto } from './dtos/get-movie-response.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getAll(): Promise<GetMovieResponseDto[]> {
    const movies = await this.movieModel.find().lean().exec();

    if (!movies || movies.length === 0) {
      throw new NotFoundException('Movies not found');
    }

    return movies.map((movie) => ({
        ...movie,
        _id: movie._id.toString(),
      }));
  }

  async getAllMovieName() {
    const movieName = await this.movieModel.find({}, 'name').exec();

    if (!movieName || movieName.length === 0) {
      throw new NotFoundException('No movies found');
    }
    return movieName;
  }

  async getOne(movieId: Types.ObjectId): Promise<GetMovieResponseDto> {
    const movie = await this.movieModel.findById(movieId).lean().exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return {
      ...movie,
      _id: movie._id.toString(),
    };
  }
}

