import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ParkService } from './park.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocationQueryDto } from './dto/location.dto';
import { ParkResponseDto } from './dto/park-response.dto';
import { GetInfoResponseDto } from './dto/get-info-response.dto';
import { ManageCode } from 'src/constants/constants';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { CreateParkDto } from './dto/create-park.dto';
import { Request } from 'express';

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
  @ApiOperation({ summary: '주차장 정보 가져오기(주차장 로그인)' })
  @ApiOkResponse({
    description: '주차장 정보 조회 성공',
    type: GetInfoResponseDto,
  })
  @ApiNotFoundResponse({
    description: '주차장을 찾을 수 없음',
  })
  @Roles(Role.PARK)
  getInfoByManageCode(@Req() req: Request) {
    return this.parkService.getInfoByManageCode(req.park.manageCode);
  }

  @Post()
  @ApiOperation({ summary: '주차장 생성' })
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    description: '생성 성공',
  })
  create(@Body() createParkDto: CreateParkDto) {
    return this.parkService.create(createParkDto);
  }
}
