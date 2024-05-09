import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AddCreditCardDto } from './dto/add-credit-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  @HttpCode(200)
  pay() {
    return this.paymentService.pay();
  }

  @UseGuards(JwtAuthGuard)
  @Post('card')
  addCreditCard(
    @Req() req: Request,
    @Body() addCreditCardDto: AddCreditCardDto,
  ) {
    return this.paymentService.addCreditCard(req.user, addCreditCardDto);
  }
}
