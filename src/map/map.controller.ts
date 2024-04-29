import { MapService } from './map.service';
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ParkService } from '../park/park.service';
import { MapBodyDto } from './dto/map.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('map')
@ApiTags('지도')
export class MapController {
  constructor(
    private readonly parkService: ParkService,
    private readonly mapService: MapService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: '주차장 반환' })
  async findByLocation(@Query() query: MapBodyDto) {
    const pcgData = await this.parkService.findByLocation(query.lat, query.lng);
    const publicData = await this.mapService.getPublicPark(
      query.lat,
      query.lng,
    );
    console.log(pcgData, publicData);
    return { pcg: pcgData, public: publicData };
  }
}
