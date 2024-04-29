import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { AccessToken, RefreshToken } from 'src/constants/constants';

@Controller('car')
@ApiTags('차량')
@ApiCookieAuth(AccessToken)
@ApiCookieAuth(RefreshToken)
@UseGuards(JwtAuthGuard)
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
  @ApiOkResponse({ description: '차량 조회 성공' })
  findOne(@Req() req: Request) {
    return this.carService.findOne(req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: '차량 삭제' })
  @ApiOkResponse({ description: '차량 삭제 성공' })
  remove(@Param('id') id: number, @Req() req: Request) {
    return this.carService.remove(id, req.user);
  }
}
