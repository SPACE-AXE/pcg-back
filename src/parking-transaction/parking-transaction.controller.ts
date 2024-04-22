import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ParkingTransaction } from './entities/parking-transaction.entity';

@Controller('parking-transaction')
@ApiTags('입출차 내역')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: '토큰 만료' })
export class ParkingTransactionController {
  constructor(
    private readonly parkingTransactionService: ParkingTransactionService,
  ) {}

  @Post()
  @ApiOperation({ summary: '입차 내역 기록' })
  @ApiCreatedResponse({
    description: '입차 내역 기록 성공',
    type: ParkingTransaction,
  })
  create(
    @Req() req: Request,
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.create(
      req.user,
      createParkingTransactionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: '입출차 내역 조회' })
  findAll(@Req() req: Request) {
    return this.parkingTransactionService.findAll(req.user);
  }
}
