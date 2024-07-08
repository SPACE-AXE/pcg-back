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
import {
  AccessToken,
  documentEndpoint,
  RefreshToken,
} from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.NODE_ENV === 'production'
    ? app.use(new SslMiddleware().use)
    : undefined;

  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: [AccessToken, RefreshToken],
  });
  app.use(helmet());
  app.use(cookieParser());
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
