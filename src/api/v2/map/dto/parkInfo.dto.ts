import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class ParkInfoDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({ description: '주차장 이름' })
  name: string;
}
