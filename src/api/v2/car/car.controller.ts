import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { CarResponseDto } from './dto/car-response.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@Controller({ path: 'car', version: '2' })
@ApiTags('차량')
@ApiBearerAuth(AccessToken)
@ApiBearerAuth(RefreshToken)
@Roles(Role.USER)
@ApiBadRequestResponse({ description: '입력값 오류' })
@ApiUnauthorizedResponse({ description: '토큰 만료' })
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: '차량 등록' })
  @ApiCreatedResponse({ description: '차량 등록 성공' })
  create(@Req() req: Request, @Body() createCarDto: CreateCarDto) {
    return this.carService.create(req.user, createCarDto);
  }

  @Get()
  @ApiOperation({ summary: '차량 조회' })
  @ApiOkResponse({
    description: '차량 조회 성공',
    isArray: true,
    type: CarResponseDto,
  })
  findAll(@Req() req: Request) {
    return this.carService.findAll(req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: '차량 삭제' })
  @ApiOkResponse({ description: '차량 삭제 성공' })
  remove(@Param('id') id: number, @Req() req: Request) {
    return this.carService.remove(id, req.user);
  }
}
