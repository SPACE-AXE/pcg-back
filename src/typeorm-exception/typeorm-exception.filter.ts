import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error(exception);

    if (exception.message.includes('Duplicate entry')) {
      response.status(409).json({
        statusCode: 409,
        message: 'Duplicate entry',
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
