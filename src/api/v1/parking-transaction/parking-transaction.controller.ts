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
import { CurrentParkingTransactionResponseDto } from './dto/current-parking-transaction-response.dto';
import { ParkAuthGuard } from '../park/park-auth/park-auth.guard';
import { UnpaidParkingTransactionResponseDto } from './dto/unpaid-parking-transaction-response.dto';
import { ParkingTransactionResponseDto } from './dto/parking-transaction-response.dto';

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
  @ApiHeader({
    name: ManageCode,
    description: '주차장 관리 코드',
    required: true,
  })
  @UseGuards(ParkAuthGuard)
  @ApiConflictResponse({ description: '차량이 이미 주차 중임' })
  addParkingTransaction(
    @Req() req: Request,
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.startParkingTransaction(
      req.park.id,
      createParkingTransactionDto,
    );
  }

  @Post('exit')
  @ApiOperation({
    summary: '출차 시 결제 확인 및 출차 가능 여부 확인',
    description:
      '결제가 선행되어야 출차가 가능하므로, 결제 이후 해당 엔드포인트에 요청하여야 합니다.',
  })
  @ApiHeader({
    name: ManageCode,
    description: '주차장 관리 코드',
    required: true,
  })
  @HttpCode(200)
  @ApiOkResponse({
    description: '출차 승인',
  })
  @UseGuards(ParkAuthGuard)
  @ApiConflictResponse({ description: '차량이 주차 중이 아님' })
  @ApiForbiddenResponse({ description: '결제가 완료되지 않음' })
  exitParkingTransaction(
    @Req() req: Request,
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.exitParkingTransaction(
      req.park.id,
      createParkingTransactionDto,
    );
  }

  @Patch('charge-start')
  @ApiOperation({ summary: '전기차 충전 시작' })
  @ApiOkResponse({
    description: '전기차 충전 시작 성공',
  })
  @ApiHeader({
    name: ManageCode,
    description: '주차장 관리 코드',
    required: true,
  })
  @ApiConflictResponse({
    description: '차량이 주차 중이 아님 / 이미 충전 중임 / 이미 충전이 끝남',
  })
  @UseGuards(ParkAuthGuard)
  startCharge(
    @Req() req: Request,
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.startCharge(
      req.park.id,
      createParkingTransactionDto,
    );
  }

  @Patch('charge-finish')
  @ApiOperation({ summary: '전기차 충전 종료' })
  @ApiOkResponse({
    description: '전기차 충전 종료 성공',
  })
  @ApiHeader({
    name: ManageCode,
    description: '주차장 관리 코드',
    required: true,
  })
  @UseGuards(ParkAuthGuard)
  @ApiConflictResponse({
    description: '차량이 주차 중이 아님 / 충전 중이 아님',
  })
  finishCharge(
    @Req() req: Request,
    @Body() createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.finishCharge(
      req.park.id,
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
    summary: '현재 주차 중인 차량 조회(회원)',
    description: '결제가 되어있지 않은 모든 차량을 조회합니다. ',
  })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(AccessToken)
  @ApiCookieAuth(RefreshToken)
  @ApiOkResponse({
    description: '현재 주차 중인 차량 조회 성공',
    type: CurrentParkingTransactionResponseDto,
  })
  @ApiUnauthorizedResponse({ description: '토큰 만료' })
  getParkedCars(@Req() req: Request) {
    return this.parkingTransactionService.getParkedCars(req.user);
  }

  @Get('unpaid')
  @ApiOperation({ summary: '미납 결제건 조회(관리 코드)' })
  @ApiOkResponse({
    description: '미납 결제건 조회 성공',
    type: UnpaidParkingTransactionResponseDto,
  })
  @ApiHeader({
    name: ManageCode,
    description: '주차장 관리 코드',
    required: true,
  })
  @ApiQuery({
    name: CarNum,
    description: '차량 번호',
  })
  @ApiNotFoundResponse({ description: '미납 결제건 없음' })
  @UseGuards(ParkAuthGuard)
  getUnpaidParkingTransactionByCarNumber(@Query(CarNum) carNum: string) {
    return this.parkingTransactionService.getUnpaidParkingTransactionByCarNumber(
      carNum,
    );
  }
}
