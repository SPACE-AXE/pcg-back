import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  carNum: string;
}
