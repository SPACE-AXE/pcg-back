import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { V1Module } from 'src/api/v1/v1.module';
import { V2Module } from 'src/api/v2/v2.module';
import {
  AccessToken,
  RefreshToken,
  documentEndpoint,
} from 'src/constants/constants';

function createV1SwaggerDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('박차고 API')
    .setDescription('박차고 API v1 문서입니다.')
    .setVersion('1.0.0')
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
  return SwaggerModule.createDocument(app, config, {
    include: [V1Module],
    deepScanRoutes: true,
  });
}

function createV2SwaggerDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('박차고 API')
    .setDescription('박차고 API v2 문서입니다.')
    .setVersion('1.0.0')
    .addApiKey({ type: 'apiKey', name: AccessToken, in: 'header' }, AccessToken)
    .addApiKey(
      { type: 'apiKey', name: RefreshToken, in: 'header' },
      RefreshToken,
    )
    .build();
  return SwaggerModule.createDocument(app, config, {
    include: [V2Module],
    deepScanRoutes: true,
  });
}

export function setupSwagger(app: INestApplication) {
  const v1Document = createV1SwaggerDocument(app);
  const v2Document = createV2SwaggerDocument(app);

  const customSiteTitle =
    process.env.NODE_ENV === 'production' ? '박차고 API' : '박차고 API - dev';

  SwaggerModule.setup(`${documentEndpoint}/v1`, app, v1Document, {
    customSiteTitle,
  });
  SwaggerModule.setup(`${documentEndpoint}/v2`, app, v2Document, {
    customSiteTitle,
  });
}
