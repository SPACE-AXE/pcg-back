import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { Park } from './entities/park.entity';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule.forFeature([Park])],
  controllers: [ParkController],
  providers: [ParkService],
})
export class ParkModule {}
