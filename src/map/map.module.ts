import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { ParkService } from 'src/park/park.service';
import { ParkModule } from 'src/park/park.module';
import { MapService } from './map.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ParkModule, ConfigModule],
  providers: [MapService, ParkService, ConfigService],
  controllers: [MapController],
})
export class MapModule {}
