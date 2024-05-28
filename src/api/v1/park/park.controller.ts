import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Query,
} from '@nestjs/common';
import { ParkService } from './park.service';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocationQueryDto } from './dto/location.dto';
import { ParkResponseDto } from './dto/park-response.dto';
import { GetIpResponseDto } from './dto/get-ip-response.dto';

@Controller({ path: 'park', version: '1' })
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

  @Get('ip')
  @ApiOperation({ summary: '관리 코드로 주차장 IP 가져오기' })
  @ApiHeader({
    name: 'manage-code',
    required: true,
    description: '주차장 관리 코드',
  })
  @ApiOkResponse({
    description: '주차장 IP 조회 성공',
    type: GetIpResponseDto,
  })
  @ApiBadRequestResponse({
    description: '관리 코드 누락',
  })
  getIpByManageCode(@Headers('manage-code') manageCode: string) {
    if (!manageCode) throw new BadRequestException('Manage code required');
    return this.parkService.getIpByManageCode(manageCode);
  }
}
