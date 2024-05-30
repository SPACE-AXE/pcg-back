import { Module } from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { ParkingTransactionController } from './parking-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { User } from 'src/api/v1/user/entities/user.entity';
import { UserService } from 'src/api/v1/user/user.service';
import { UserModule } from 'src/api/v1/user/user.module';
import { Car } from 'src/api/v1/car/entities/car.entity';
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
