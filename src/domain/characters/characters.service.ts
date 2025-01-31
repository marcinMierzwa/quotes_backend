import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './character.schema';
import { CreateCharacterDto } from './dtos/create-character.dto';

@Injectable()
export class CharactersService {
    constructor(@InjectModel(Character.name) private characterModel: Model<Character>) {}


    async create(createCharacterDto: CreateCharacterDto) {
        const createdCharater = await this.characterModel.create(createCharacterDto);
        return {
          createdCharater,
          message: 'character created succesfully'
        }
      }
}
