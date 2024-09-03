import { Module } from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { ParkingTransactionController } from './parking-transaction.controller';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { UserV2 } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { Car } from '../car/entities/car.entity';
import { ParkModule } from '../park/park.module';
import { DatabaseModule } from '../../../database/database.module';
import { ParkService } from '../park/park.service';
import { Park } from '../park/entities/park.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([ParkingTransaction, UserV2, Car, Park]),
    UserModule,
    ParkModule,
  ],
  controllers: [ParkingTransactionController],
  providers: [ParkingTransactionService, UserService, ParkService],
})
export class ParkingTransactionModule {}
