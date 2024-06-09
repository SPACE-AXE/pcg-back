import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from './api/v1/v1.module';
import { V2Module } from './api/v2/v2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    TypeOrmModule.forRoot(typeORMConfig),
    V1Module,
    V2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
