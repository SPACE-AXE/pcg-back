import { Injectable } from '@nestjs/common';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ParkingTransactionService {
  constructor(
    @InjectRepository(ParkingTransaction)
    private readonly parkingTransactionRepository: Repository<ParkingTransaction>,
  ) {}

  async create(
    user: User,
    createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    const newParkingTransaction = this.parkingTransactionRepository.create({
      user: { id: user.id },
      car: { carNum: createParkingTransactionDto.carNum },
      park: { id: createParkingTransactionDto.parkId },
    });

    return this.parkingTransactionRepository.save(newParkingTransaction);
  }

  findAll(user: User) {
    return this.parkingTransactionRepository.find({
      where: { user: { id: user.id } },
    });
  }
}
