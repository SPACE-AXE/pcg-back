import { ApiProperty } from '@nestjs/swagger';

export class GetIpResponseDto {
  @ApiProperty({ description: '주차장 IP' })
  ip: string;
}
