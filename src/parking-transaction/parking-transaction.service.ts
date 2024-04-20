import { Injectable } from '@nestjs/common';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import { UpdateParkingTransactionDto } from './dto/update-parking-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { Park } from 'src/park/entities/park.entity';

@Injectable()
export class ParkingTransactionService {
  constructor(
    @InjectRepository(ParkingTransaction)
    private readonly parkingTransactionRepository: Repository<ParkingTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Park)
    private readonly parkRepository: Repository<Park>,
  ) {}

  async create(createParkingTransactionDto: CreateParkingTransactionDto) {
    const promises = await Promise.all([
      await this.userRepository.findOne({
        where: { id: createParkingTransactionDto.userId },
      }),
      await this.carRepository.findOne({
        where: { id: createParkingTransactionDto.carId },
      }),
      await this.parkRepository.findOne({
        where: { id: createParkingTransactionDto.parkId },
      }),
    ]);

    const newParkingTransaction = this.parkingTransactionRepository.create({
      user: promises[0],
      car: promises[1],
      park: promises[2],
    });

    return this.parkingTransactionRepository.save(newParkingTransaction);
  }

  findAll() {
    return `This action returns all parkingTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingTransaction`;
  }

  update(id: number, updateParkingTransactionDto: UpdateParkingTransactionDto) {
    return `This action updates a #${id} parkingTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingTransaction`;
  }
}
