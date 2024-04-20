import { Module } from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { ParkingTransactionController } from './parking-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { User } from 'src/user/entity/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { Park } from 'src/park/entities/park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingTransaction, User, Car, Park])],
  controllers: [ParkingTransactionController],
  providers: [ParkingTransactionService],
})
export class ParkingTransactionModule {}
