import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { MapModule } from './map/map.module';
import { ParkModule } from './park/park.module';
import { ParkingTransactionModule } from './parking-transaction/parking-transaction.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    CarModule,
    MapModule,
    ParkModule,
    ParkingTransactionModule,
    PaymentModule,
    UserModule,
  ],
})
export class V2Module {}
