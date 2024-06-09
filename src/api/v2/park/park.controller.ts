import { Controller, Get, Headers, Query, UseGuards } from '@nestjs/common';
import { ParkService } from './park.service';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocationQueryDto } from './dto/location.dto';
import { ParkResponseDto } from './dto/park-response.dto';
import { GetInfoResponseDto } from './dto/get-info-response.dto';
import { ManageCode } from 'src/constants/constants';
import { ParkAuthGuard } from './park-auth/park-auth.guard';

@Controller({ path: 'park', version: '2' })
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

  @Get('info')
  @ApiOperation({ summary: '관리 코드로 주차장 정보 가져오기' })
  @ApiHeader({
    name: ManageCode,
    description: '주차장 관리 코드',
  })
  @ApiOkResponse({
    description: '주차장 정보 조회 성공',
    type: GetInfoResponseDto,
  })
  @ApiBadRequestResponse({
    description: '관리 코드 누락',
  })
  @ApiNotFoundResponse({
    description: '주차장을 찾을 수 없음',
  })
  @UseGuards(ParkAuthGuard)
  getInfoByManageCode(@Headers(ManageCode) manageCode: string) {
    return this.parkService.getInfoByManageCode(manageCode);
  }
}
