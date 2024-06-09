import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AddCreditCardDto } from './dto/add-credit-card.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { CardResponseDto } from './dto/card-response.dto';
import { PayDto } from './dto/pay.dto';

@Controller({ path: 'payment', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiCookieAuth(AccessToken)
@ApiCookieAuth(RefreshToken)
@ApiTags('결제')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  @ApiOperation({
    summary: '회원 결제',
    description:
      '명세되어 있지 않은 오류가 발생한 경우 결제 도중 Axios에서 발생한 오류입니다. 이 경우에는 Axios의 status code를 따릅니다.',
  })
  @HttpCode(200)
  @ApiOkResponse({ description: '결제 성공' })
  @ApiNotFoundResponse({ description: '카드가 등록되어 있지 않음' })
  pay(@Req() req: Request, @Body() payDto: PayDto) {
    return this.paymentService.pay(req.user, payDto);
  }

  @Post('card')
  @ApiOperation({ summary: '신용카드 등록' })
  @ApiCreatedResponse({ description: '신용카드 등록 성공' })
  @ApiConflictResponse({ description: '이미 등록된 카드가 있음' })
  @ApiBadRequestResponse({ description: '카드 양식이 잘못 됨' })
  addCreditCard(
    @Req() req: Request,
    @Body() addCreditCardDto: AddCreditCardDto,
  ) {
    return this.paymentService.addCreditCard(req.user, addCreditCardDto);
  }

  @Get('card')
  @ApiOperation({ summary: '신용카드 조회' })
  @ApiOkResponse({
    description: '신용카드 조회 성공',
    type: CardResponseDto,
  })
  getCreditCard(@Req() req: Request) {
    return this.paymentService.getCreditCard(req.user);
  }

  @Delete('card')
  @ApiOperation({ summary: '신용카드 삭제' })
  @ApiOkResponse({ description: '신용카드 삭제 성공' })
  deleteCreditCard(@Req() req: Request) {
    return this.paymentService.deleteCreditCard(req.user);
  }
}
