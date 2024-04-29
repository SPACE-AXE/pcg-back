import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, Max, Min } from 'class-validator';

export class MapBodyDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '위도' })
  lat: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '경도' })
  lng: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '가격' })
  price: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '주차 구획 수' })
  space: number;

  @Type(() => Boolean)
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiProperty({ description: '장애인 여부' })
  disabled: Boolean;
}
