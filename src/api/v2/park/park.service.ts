import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Park } from './entities/park.entity';
import { Repository } from 'typeorm';
import { ParkResponseDto } from './dto/park-response.dto';
import { CreateParkDto } from './dto/create-park.dto';
import { Point } from 'geojson';

@Injectable()
export class ParkService {
  constructor(
    @InjectRepository(Park) private readonly parkRepository: Repository<Park>,
  ) {}

  async findByLocation(x: number, y: number) {
    const results = await this.parkRepository.query(
      `SELECT id, name, phone, address, location, total_space, car_space, disability_space FROM park WHERE ST_Distance_Sphere(park.location, Point(${y}, ${x})) <= 5000;`,
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

    return results as ParkResponseDto[];
  }

  async getInfoByManageCode(manageCode: string) {
    const park = await this.parkRepository.findOne({
      where: {
        manageCode,
      },
      select: {
        ip: true,
        id: true,
        name: true,
        phone: true,
        address: true,
        totalSpace: true,
        carSpace: true,
        disabilitySpace: true,
      },
    });
    if (!park) throw new NotFoundException('Park not found');
    return park;
  }

  async create(createParkDto: CreateParkDto) {
    const {
      address,
      carSpace,
      disabilitySpace,
      manageCode,
      name,
      phone,
      totalSpace,
      location: { x, y },
      ip,
    } = createParkDto;

    return await this.parkRepository
      .createQueryBuilder()
      .insert()
      .into(Park)
      .values([
        {
          address,
          carSpace,
          disabilitySpace,
          manageCode,
          name,
          phone,
          totalSpace,
          location: () => `ST_GeomFromText('POINT(${y} ${x})')`,
          ip,
        },
      ])
      .execute();
  }
}
