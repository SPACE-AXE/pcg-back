import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { ParkService } from '../park/park.service';
import { ParkModule } from '../park/park.module';
import { MapService } from './map.service';
import { DatabaseModule } from '../../../database/database.module';
import { Park } from '../park/entities/park.entity';

@Module({
  imports: [ParkModule, DatabaseModule.forFeature([Park])],
  providers: [MapService, ParkService],
  controllers: [MapController],
})
export class MapModule {}
