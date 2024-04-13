import { Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Park } from './entities/park.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkService {
  constructor(
    @InjectRepository(Park) private readonly parkRepository: Repository<Park>,
  ) {}

  create(createParkDto: CreateParkDto) {
    return 'This action adds a new park';
  }

  findAll() {
    return `This action returns all park`;
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
