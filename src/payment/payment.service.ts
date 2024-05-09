import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor(private readonly configService: ConfigService) {}
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
              number: '5461117300743286',
              expiryYear: '27',
              expiryMonth: '11',
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
}
