import { IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  carNum: string;
  @IsNumber()
  userId: number;
}
