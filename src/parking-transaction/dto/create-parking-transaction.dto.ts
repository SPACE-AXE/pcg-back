import { IsNumber } from 'class-validator';

export class CreateParkingTransactionDto {
  @IsNumber()
  parkId: number;
  @IsNumber()
  carId: number;
}
