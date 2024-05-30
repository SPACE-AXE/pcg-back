import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
  HttpCode,
  Query,
  Headers,
} from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/api/v1/auth/jwt-auth.guard';
import {
  AccessToken,
  CarNum,
  ManageCode,
  RefreshToken,
} from 'src/constants/constants';
import { ParkingTransactionResponseDto } from './dto/parking-transaction-response.dto';
import { ParkAuthGuard } from '../park/park-auth/park-auth.guard';

@Controller({ path: 'parking-transaction', version: '1' })
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
  @ApiConflictResponse({ description: '차량이 이미 주차 중임' })
  addParkingTransaction(
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.addParkingTransaction(
      createParkingTransactionDto,
    );
  }

  @Post('exit')
  @ApiOperation({
    summary: '출차 시 결제 확인 및 출차 가능 여부 확인',
    description:
      '결제가 선행되어야 출차가 가능하므로, 결제 이후 해당 엔드포인트에 요청하여야 합니다.',
  })
  @HttpCode(200)
  @ApiOkResponse({
    description: '출차 승인',
  })
  @ApiConflictResponse({ description: '차량이 주차 중이 아님' })
  @ApiForbiddenResponse({ description: '결제가 완료되지 않음' })
  exitParkingTransaction(
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.exitParkingTransaction(
      createParkingTransactionDto,
    );
  }

  @Patch('charge-start')
  @ApiOperation({ summary: '전기차 충전 시작' })
  @ApiOkResponse({
    description: '전기차 충전 시작 성공',
  })
  @ApiConflictResponse({
    description: '차량이 주차 중이 아님 / 이미 충전 중임 / 이미 충전이 끝남',
  })
  startCharge(
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.startCharge(
      createParkingTransactionDto,
    );
  }

  @Patch('charge-finish')
  @ApiOperation({ summary: '전기차 충전 종료' })
  @ApiOkResponse({
    description: '전기차 충전 종료 성공',
  })
  @ApiConflictResponse({
    description: '차량이 주차 중이 아님 / 충전 중이 아님',
  })
  finishCharge(
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.finishCharge(
      createParkingTransactionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: '회원 입/출차 내역 조회' })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(AccessToken)
  @ApiCookieAuth(RefreshToken)
  @ApiOkResponse({
    description: '입출차 내역 조회 성공',
    type: ParkingTransactionResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: '토큰 만료' })
  findAll(@Req() req: Request) {
    return this.parkingTransactionService.findAll(req.user);
  }

  @Get('current')
  @ApiOperation({
    summary: '현재 주차 중인 차량 조회',
    description: '결제가 되어있지 않은 모든 차량을 조회합니다. ',
  })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(AccessToken)
  @ApiCookieAuth(RefreshToken)
  @ApiOkResponse({
    description: '현재 주차 중인 차량 조회 성공',
    type: ParkingTransactionResponseDto,
  })
  @ApiUnauthorizedResponse({ description: '토큰 만료' })
  getParkedCars(@Req() req: Request) {
    return this.parkingTransactionService.getParkedCars(req.user);
  }

  @Get('unpaid')
  @ApiOperation({ summary: '미납 결제건 조회' })
  @ApiOkResponse({ description: '미납 결제건 조회 성공' })
  @ApiHeader({
    name: ManageCode,
    description: '주차장 관리 코드',
  })
  @ApiQuery({
    name: CarNum,
    description: '차량 번호',
  })
  @ApiNotFoundResponse({ description: '미납 결제건 없음' })
  @UseGuards(ParkAuthGuard)
  getUnpaidParkingTransactionByCarNumber(
    @Headers(ManageCode) _manageCode: string,
    @Query(CarNum) carNum: string,
  ) {
    return this.parkingTransactionService.getUnpaidParkingTransactionByCarNumber(
      carNum,
    );
  }
}
