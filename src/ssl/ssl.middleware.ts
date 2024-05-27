import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SslMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    if (isSecure) {
      next();
    } else {
      throw new ForbiddenException('SSL Required');
    }
  }
}
