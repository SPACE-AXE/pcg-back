import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserV1 } from '../user/entities/user.entity';
import { ParkingTransaction } from '../parking-transaction/entities/parking-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, UserV1, ParkingTransaction]),
    UserModule,
  ],
  controllers: [CarController],
  providers: [CarService, UserService],
})
export class CarModule {}
