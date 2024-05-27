import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { User } from 'src/api/v1/user/entities/user.entity';
import { UserService } from 'src/api/v1/user/user.service';
import { ParkingTransactionService } from 'src/api/v1/parking-transaction/parking-transaction.service';
import { ParkingTransaction } from 'src/api/v1/parking-transaction/entities/parking-transaction.entity';
import { Car } from 'src/api/v1/car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, User, ParkingTransaction, Car])],
  controllers: [PaymentController],
  providers: [PaymentService, UserService, ParkingTransactionService],
})
export class PaymentModule {}
