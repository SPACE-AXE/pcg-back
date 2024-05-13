import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Park } from './entities/park.entity';
import { Repository } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LocationQueryDto } from './dto/location.dto';

export class ParkGetResult {
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
@Injectable()
export class ParkService {
  constructor(
    @InjectRepository(Park) private readonly parkRepository: Repository<Park>,
  ) {}

  async findByLocation(x: number, y: number) {
    const results = await this.parkRepository.query(
      `SELECT * FROM park WHERE ST_Distance_Sphere(park.location, Point(${y}, ${x})) <= 5000;`,
    );

    for (const result of results) {
      delete result.manage_code;
      result.totalSpace = result.total_space;
      delete result.total_space;
      result.carSpace = result.car_space;
      delete result.car_space;
      result.disabilitySpace = result.disability_space;
      delete result.disability_space;
      result.location = {
        x: result.location.y,
        y: result.location.x,
      };
    }

    return results as ParkGetResult[];
  }
}
