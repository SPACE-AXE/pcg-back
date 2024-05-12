import { Injectable } from '@nestjs/common';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class ParkingTransactionService {
  constructor(
    @InjectRepository(ParkingTransaction)
    private readonly parkingTransactionRepository: Repository<ParkingTransaction>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createParkingTransactionDto: CreateParkingTransactionDto) {
    const car = await this.carRepository.findOne({
      where: { carNum: createParkingTransactionDto.carNum },
      relations: {
        user: true,
      },
    });

    const newParkingTransaction = this.parkingTransactionRepository.create({
      user: { id: car ? car.user.id : null },
      car: { id: car ? car.id : null },
      park: { id: createParkingTransactionDto.parkId },
      carNum: createParkingTransactionDto.carNum,
    });

    return this.parkingTransactionRepository.insert(newParkingTransaction);
  }

  findAll(user: User) {
    return this.parkingTransactionRepository.find({
      where: { user: { id: user.id } },
    });
  }
}
