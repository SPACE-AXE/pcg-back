import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import helmet from 'helmet';

const documentEndpoint = process.env.SWAGGER_ENDPOINT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(helmet());

  app.use(
    [documentEndpoint],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('박차고 API')
    .setDescription('박차고 API 문서입니다.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(documentEndpoint, app, document);
  await app.listen(3000);
}
bootstrap();
