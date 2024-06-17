import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { ParkService } from '../park/park.service';
import { ParkModule } from '../park/park.module';
import { MapService } from './map.service';

@Module({
  imports: [ParkModule],
  providers: [MapService, ParkService],
  controllers: [MapController],
})
export class MapModule {}
