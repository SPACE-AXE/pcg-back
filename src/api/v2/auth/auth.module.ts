import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserV2 } from '../user/entities/user.entity';
import { EmailToken } from './entities/email-token.entity';
import { DatabaseModule } from '../../../database/database.module';
import { Park } from '../park/entities/park.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    DatabaseModule.forFeature([UserV2, EmailToken, Park]),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
