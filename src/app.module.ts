import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { ParkModule } from './park/park.module';
import { CarModule } from './car/car.module';
import { ParkingTransactionModule } from './parking-transaction/parking-transaction.module';
import { PaymentModule } from './payment/payment.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    AuthModule,
    ParkModule,
    CarModule,
    ParkingTransactionModule,
    PaymentModule,
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
