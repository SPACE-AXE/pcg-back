import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('car')
@ApiTags('차량')
@ApiBadRequestResponse({ description: '입력값 오류' })
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: '차량 등록' })
  @ApiCreatedResponse({ description: '차량 등록 성공' })
  @ApiBearerAuth()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: '유저 아이디 기반 차량 조회' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: '차량 조회 성공' })
  findOne(@Param('userId') id: string) {
    return this.carService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '차량 삭제' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: '차량 삭제 성공' })
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
