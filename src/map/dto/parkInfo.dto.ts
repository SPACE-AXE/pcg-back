import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class ParkInfoDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({ description: '주차장 이름' })
  name: String;
}
