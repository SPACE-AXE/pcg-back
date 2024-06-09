import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ParkingTransaction } from '../parking-transaction/entities/parking-transaction.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(ParkingTransaction)
    private readonly parkingTransactionRepository: Repository<ParkingTransaction>,
  ) {}

  async create(user: User, createCarDto: CreateCarDto) {
    const newCar = this.carRepository.create({
      user: { id: user.id },
      carNum: createCarDto.carNum,
    });
    const result = await this.carRepository.insert(newCar);
    this.parkingTransactionRepository.update(
      { carNum: newCar.carNum },
      { car: { id: newCar.id } },
    );
    this.parkingTransactionRepository.update(
      { carNum: newCar.carNum },
      { user: { id: user.id } },
    );
    return result;
  }

  findAll(user: User) {
    return this.carRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async remove(id: number, user: User) {
    return this.carRepository.delete({ id, user });
  }
}
