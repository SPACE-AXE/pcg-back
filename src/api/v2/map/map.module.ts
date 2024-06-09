import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { ParkService } from '../park/park.service';
import { ParkModule } from '../park/park.module';
import { MapService } from './map.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ParkModule, ConfigModule],
  providers: [MapService, ParkService, ConfigService],
  controllers: [MapController],
})
export class MapModule {}
