import { ApiProperty, PickType } from '@nestjs/swagger';
import { ParkResponseDto } from './park-response.dto';

export class GetInfoResponseDto extends PickType(ParkResponseDto, [
  'id',
  'name',
  'phone',
  'address',
  'totalSpace',
  'carSpace',
  'disabilitySpace',
]) {
  @ApiProperty({ description: '주차장 IP' })
  ip: string;
}
