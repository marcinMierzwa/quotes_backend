import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './character.schema';
import { CreateCharacterDto } from './dtos/create-character.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
  ) {}

  async getCharacters() {
    const characters = await this.characterModel.find();

    if (!characters || characters.length === 0) {
      throw new NotFoundException('No characters found');
    }
    return {
      characters: characters
    };

  }

  async create(createCharacterDto: CreateCharacterDto) {
  }
}
