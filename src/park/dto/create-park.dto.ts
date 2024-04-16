import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @IsNumber()
  @ApiProperty({ description: '위도' })
  x: number;

  @IsNumber()
  @ApiProperty({ description: '경도' })
  y: number;
}

export class CreateParkDto {
  @IsString()
  @ApiProperty({ description: '주차장 이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '주차장 전화번호' })
  phone: string;

  @IsString()
  @ApiProperty({ description: '주차장 주소' })
  address: string;

  @IsNumber()
  @ApiProperty({ description: '주차장 전체 주차 공간' })
  totalSpace: number;

  @IsNumber()
  @ApiProperty({ description: '주차장 일반 주차 공간' })
  carSpace: number;

  @IsNumber()
  @ApiProperty({ description: '주차장 장애인 주차 공간' })
  disabilitySpace: number;

  @IsString()
  @ApiProperty({ description: '주차장 관리 코드' })
  manageCode: string;

  @IsNotEmptyObject()
  @ApiProperty({
    description: '주차장 위치 좌표',
  })
  location: LocationDto;
}
