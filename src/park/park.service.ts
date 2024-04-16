import { ConflictException, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Park } from './entities/park.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ParkService {
  constructor(
    @InjectRepository(Park) private readonly parkRepository: Repository<Park>,
  ) {}

  async create(createParkDto: CreateParkDto) {
    try {
      const location = `${createParkDto.location.x} ${createParkDto.location.y}`;
      await this.parkRepository
        .createQueryBuilder()
        .insert()
        .into(Park)
        .values({
          ...createParkDto,
          location: () => `ST_GeomFromText('POINT(${location})')`,
        })
        .execute();
    } catch (error) {
      console.error(error);
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }
    }
  }

  async findAll() {
    return (await this.parkRepository.query(
      'SELECT * FROM park',
    )) as CreateParkDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} park`;
  }

  update(id: number, updateParkDto: UpdateParkDto) {
    return `This action updates a #${id} park`;
  }

  remove(id: number) {
    return `This action removes a #${id} park`;
  }
}
