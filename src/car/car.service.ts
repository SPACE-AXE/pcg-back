import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}

  async create(user: User, createCarDto: CreateCarDto) {
    const newCar = this.carRepository.create({
      user,
      carNum: createCarDto.carNum,
    });
    return await this.carRepository.save(newCar);
  }

  findOne(user: User) {
    return this.carRepository.findOne({
      where: { user: { id: user.id } },
    });
  }

  remove(id: number, user: User) {
    return this.carRepository.delete({ id, user });
  }
}
