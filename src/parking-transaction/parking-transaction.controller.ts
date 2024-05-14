import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccessToken, RefreshToken } from 'src/constants/constants';

@Controller('parking-transaction')
@ApiTags('입출차 내역')
export class ParkingTransactionController {
  constructor(
    private readonly parkingTransactionService: ParkingTransactionService,
  ) {}

  @Post()
  @ApiOperation({ summary: '입차 내역 기록' })
  @ApiCreatedResponse({
    description: '입차 내역 기록 성공',
  })
  create(@Body() createParkingTransactionDto: CreateParkingTransactionDto) {
    return this.parkingTransactionService.create(createParkingTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: '회원 입/출차 내역 조회' })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(AccessToken)
  @ApiCookieAuth(RefreshToken)
  @ApiOkResponse({
    description: '입출차 내역 조회 성공',
  })
  @ApiUnauthorizedResponse({ description: '토큰 만료' })
  findAll(@Req() req: Request) {
    return this.parkingTransactionService.findAll(req.user);
  }
}
