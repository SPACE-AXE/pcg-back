import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger();
    const { ip, method, path: url } = req;
    const userAgent = req.get('user-agent') || '';

    const startTime = Date.now();
    logger.log(
      `${method} ${url} from IP: ${ip}, User-Agent: ${userAgent}`,
      'Request',
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || 'N/A';
      const responseTime = Date.now() - startTime;

      logger.log(
        `${method} ${url} ${statusCode} from IP: ${ip} - ${contentLength} bytes - ${responseTime}ms`,
        'Response',
      );
    });

    next();
  }
}
