import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth() {
    return { status: 'OK' };
  }
}
