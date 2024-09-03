import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './entities/car.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserV2 } from '../user/entities/user.entity';
import { ParkingTransaction } from '../parking-transaction/entities/parking-transaction.entity';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [
    DatabaseModule.forFeature([Car, UserV2, ParkingTransaction]),
    UserModule,
  ],
  controllers: [CarController],
  providers: [CarService, UserService],
})
export class CarModule {}
