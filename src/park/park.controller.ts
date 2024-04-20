import { Controller, Get, Query } from '@nestjs/common';
import { ParkService } from './park.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocationQueryDto } from './dto/location.dto';

@Controller('park')
@ApiTags('주차장')
export class ParkController {
  constructor(private readonly parkService: ParkService) {}

  @Get('location')
  @ApiOperation({ summary: '주변 주차장 조회(5km 이내)' })
  findByLocation(@Query() query: LocationQueryDto) {
    return this.parkService.findByLocation(query.x, query.y);
  }
}
