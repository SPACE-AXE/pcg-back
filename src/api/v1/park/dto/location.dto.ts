import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class LocationQueryDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty({ description: '위도' })
  x: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty({ description: '경도' })
  y: number;
}
