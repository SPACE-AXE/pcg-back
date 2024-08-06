import { IsString } from 'class-validator';
import { IsTimestamp } from '../validator/isTimestamp';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParkingTransactionDto {
  @IsString()
  carNum: string;
  @IsTimestamp()
  @ApiProperty({ example: Date.now() })
  timestamp: number;
}
