import { IsString } from 'class-validator';

export class CreateCharacterDto {

  @IsString()
  name: string;

  @IsString()
  wikiUrl: string;

  @IsString()
  race: string;

  @IsString()
  birth: string;

  @IsString()
  gender: string;

  @IsString()
  death: string;
  
}
