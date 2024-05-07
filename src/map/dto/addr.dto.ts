import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class addrDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({ description: '주소' })
  addr: String;
}
