import { ApiProperty } from '@nestjs/swagger';
import { LocationQueryDto } from './location.dto';

export class ParkResponseDto {
  @ApiProperty({ description: '주차장 ID' })
  id: number;
  @ApiProperty({ description: '주차장 이름' })
  name: string;
  @ApiProperty({ description: '주차장 전화번호' })
  phone: string;
  @ApiProperty({ description: '주차장 주소' })
  address: string;
  @ApiProperty({ description: '주차장 전체 주차 공간' })
  totalSpace: number;
  @ApiProperty({ description: '주차장 일반 주차 공간' })
  carSpace: number;
  @ApiProperty({ description: '주차장 장애인 주차 공간' })
  disabilitySpace: number;
  @ApiProperty({ description: '주차장 위치' })
  location: LocationQueryDto;
}
