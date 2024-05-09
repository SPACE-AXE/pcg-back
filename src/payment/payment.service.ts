import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { User } from 'src/user/entities/user.entity';
import { AddCreditCardDto } from './dto/add-credit-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}
  async pay() {
    const url = 'https://api.portone.io';
    const paymentId = crypto.randomUUID();
    const pay = await axios.post(
      `${url}/payments/${paymentId}/instant`,
      {
        channelKey: this.configService.get('CHANNEL_KEY'),
        method: {
          card: {
            credential: {
              number: '',
              expiryYear: '',
              expiryMonth: '',
            },
          },
        },
        orderName: '테스트 주문',
        amount: {
          total: 1000,
        },
        currency: 'KRW',
      },
      {
        headers: {
          Authorization: `PortOne ${this.configService.get('PORTONE_API_SECRET')}`,
        },
      },
    );

    return pay.data;
  }

  addCreditCard(user: User, addCreditCardDto: AddCreditCardDto) {
    const newCard = this.cardRepository.create({
      user,
      ...addCreditCardDto,
    });

    return this.cardRepository.insert(newCard);
  }
}
