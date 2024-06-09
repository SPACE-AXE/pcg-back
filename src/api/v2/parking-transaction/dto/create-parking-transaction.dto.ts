import { IsString } from 'class-validator';

export class CreateParkingTransactionDto {
  @IsString()
  carNum: string;
}
