import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Park } from './entities/park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Park])],
  controllers: [ParkController],
  providers: [ParkService],
})
export class ParkModule {}
