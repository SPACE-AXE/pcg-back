import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const newCar = this.carRepository.create(createCarDto);
    return await this.carRepository.save(newCar);
  }

  findOne(id: number) {
    return this.carRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
  }

  remove(id: number) {
    return this.carRepository.delete({ id });
  }
}
