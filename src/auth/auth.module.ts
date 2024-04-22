import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
