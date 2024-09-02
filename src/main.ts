import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import expressBasicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AxiosExceptionFilter } from './axios-exception/axios-exception.filter';
import { TypeormExceptionFilter } from './typeorm-exception/typeorm-exception.filter';
import { SslMiddleware } from './ssl/ssl.middleware';
import { setupSwagger } from './swagger/swagger.config';
import { documentEndpoint } from './constants/constants';
import { AppLoggerMiddleware } from './app-logger/app-logger.middleware';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from './logger';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerOptions),
  });
  process.env.NODE_ENV === 'production'
    ? app.use(new SslMiddleware().use)
    : undefined;

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          imgSrc: ["'self'"],
          connectSrc: [
            "'self'",
            'https://naveropenapi.apigw.ntruss.com',
            'http://api.data.go.kr',
            'https://business.juso.go.kr',
            'https://api.portone.io',
          ],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: [],
        },
      },
    }),
  );
  app.use(cookieParser());
  app.use(new AppLoggerMiddleware().use);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AxiosExceptionFilter());
  app.useGlobalFilters(new TypeormExceptionFilter());
  process.env.NODE_ENV === 'production'
    ? app.use(
        [`${documentEndpoint}/v1`, `${documentEndpoint}/v2`],
        expressBasicAuth({
          challenge: true,
          users: {
            [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD,
          },
        }),
      )
    : undefined;

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
