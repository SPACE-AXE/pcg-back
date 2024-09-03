import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { UserV1 } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ParkingTransactionService } from '../parking-transaction/parking-transaction.service';
import { ParkingTransaction } from '../parking-transaction/entities/parking-transaction.entity';
import { Car } from '../car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, UserV1, ParkingTransaction, Car])],
  controllers: [PaymentController],
  providers: [PaymentService, UserService, ParkingTransactionService],
})
export class PaymentModule {}
