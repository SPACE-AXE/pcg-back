import { IsNumber, IsString } from 'class-validator';

export class CreateParkingTransactionDto {
  @IsNumber()
  parkId: number;
  @IsString()
  carNum: string;
}
