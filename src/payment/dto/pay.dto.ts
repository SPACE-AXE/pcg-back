import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';

export class PayDto {
  @ApiProperty({ description: '주차장 ID' })
  @IsNumber()
  parkId: number;
  @ApiProperty({ description: '차량 번호' })
  @IsNumberString()
  cardNum: string;
}
