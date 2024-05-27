import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/api/v1/user/user.module';
import { UserService } from 'src/api/v1/user/user.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/v1/user/entities/user.entity';
import { EmailToken } from './entities/email-token.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([User, EmailToken]),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
