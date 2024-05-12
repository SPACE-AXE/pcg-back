import { Module } from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { ParkingTransactionController } from './parking-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { Car } from 'src/car/entities/car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingTransaction, User, Car]),
    UserModule,
  ],
  controllers: [ParkingTransactionController],
  providers: [ParkingTransactionService, UserService],
})
export class ParkingTransactionModule {}
