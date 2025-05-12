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

  async getCharacterName() {
    const characterName = await this.characterModel.find({}, 'name').exec();

    if (!characterName || characterName.length === 0) {
      throw new NotFoundException('No characters found');
    }
    return characterName;
      

  }

  async create(createCharacterDto: CreateCharacterDto) {
  }
}
