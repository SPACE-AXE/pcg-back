import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { MapModule } from './map/map.module';
import { ParkModule } from './park/park.module';
import { ParkingTransactionModule } from './parking-transaction/parking-transaction.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '../../database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ParkModule,
    CarModule,
    ParkingTransactionModule,
    PaymentModule,
    MapModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class V2Module {}
