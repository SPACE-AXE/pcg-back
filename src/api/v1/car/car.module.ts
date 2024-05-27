import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { UserModule } from 'src/api/v1/user/user.module';
import { UserService } from 'src/api/v1/user/user.service';
import { User } from 'src/api/v1/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User]), UserModule],
  controllers: [CarController],
  providers: [CarService, UserService],
})
export class CarModule {}
