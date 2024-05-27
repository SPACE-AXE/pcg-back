import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './api/v1/user/user.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './api/v1/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { ParkModule } from './api/v1/park/park.module';
import { CarModule } from './api/v1/car/car.module';
import { ParkingTransactionModule } from './api/v1/parking-transaction/parking-transaction.module';
import { PaymentModule } from './api/v1/payment/payment.module';
import { MapModule } from './api/v1/map/map.module';

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
