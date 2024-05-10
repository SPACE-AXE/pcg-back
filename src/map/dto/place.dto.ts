import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class placeDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({ description: '장소' })
  place: String;
}
