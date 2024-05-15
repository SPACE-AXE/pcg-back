import { Controller, Get, Query } from '@nestjs/common';
import { ParkService } from './park.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocationQueryDto } from './dto/location.dto';
import { ParkResponseDto } from './dto/park-response.dto';

@Controller('park')
@ApiTags('주차장')
export class ParkController {
  constructor(private readonly parkService: ParkService) {}

  @Get('location')
  @ApiOperation({ summary: '주변 주차장 조회(5km 이내)' })
  @ApiOkResponse({
    description: '주변 주차장 조회 성공',
    type: ParkResponseDto,
    isArray: true,
  })
  findByLocation(@Query() query: LocationQueryDto) {
    return this.parkService.findByLocation(query.x, query.y);
  }
}
