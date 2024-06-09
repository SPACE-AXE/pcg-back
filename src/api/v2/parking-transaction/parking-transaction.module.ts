import { Module } from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { ParkingTransactionController } from './parking-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { Car } from '../car/entities/car.entity';
import { ParkModule } from '../park/park.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingTransaction, User, Car]),
    UserModule,
    ParkModule,
  ],
  controllers: [ParkingTransactionController],
  providers: [ParkingTransactionService, UserService],
})
export class ParkingTransactionModule {}
