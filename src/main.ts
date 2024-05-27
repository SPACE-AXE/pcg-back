import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AccessToken, RefreshToken } from './api/v1/constants/constants';
import { AxiosExceptionFilter } from './api/v1/axios-exception/axios-exception.filter';
import { TypeormExceptionFilter } from './api/v1/typeorm-exception/typeorm-exception.filter';
import { SslMiddleware } from './ssl/ssl.middleware';

const documentEndpoint = process.env.SWAGGER_ENDPOINT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.NODE_ENV === 'production'
    ? app.use(new SslMiddleware())
    : undefined;
  app.enableCors({
    origin: '*',
    credentials: true,
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
        [documentEndpoint],
        expressBasicAuth({
          challenge: true,
          users: {
            [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD,
          },
        }),
      )
    : undefined;
  const config = new DocumentBuilder()
    .setTitle('박차고 API')
    .setDescription('박차고 API 문서입니다.')
    .setVersion('0.0.1')
    .addCookieAuth(
      AccessToken,
      {
        type: 'apiKey',
      },
      AccessToken,
    )
    .addCookieAuth(
      RefreshToken,
      {
        type: 'apiKey',
      },
      RefreshToken,
    )
    .build();

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(documentEndpoint, app, document, {
    customSiteTitle:
      process.env.NODE_ENV === 'production' ? '박차고 API' : '박차고 API - dev',
  });
  await app.listen(3000);
}
bootstrap();
