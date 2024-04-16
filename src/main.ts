import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const documentEndpoint = process.env.SWAGGER_ENDPOINT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'access-token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'refresh-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(documentEndpoint, app, document, {
    customSiteTitle:
      process.env.NODE_ENV === 'production' ? '박차고 API' : '박차고 API - dev',
  });
  await app.listen(3000);
}
bootstrap();
