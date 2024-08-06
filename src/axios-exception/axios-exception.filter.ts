import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AxiosExceptionFilter.name);
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.response?.status;

    this.logger.error(exception);

    response.status(status).json({
      statusCode: status,
      message: exception.response?.data,
    });
  }
}
