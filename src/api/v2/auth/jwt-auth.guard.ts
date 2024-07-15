import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { UserService } from '../user/user.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = Array.isArray(request.headers[AccessToken])
      ? request.headers[AccessToken][0]
      : request.headers[AccessToken];
    const refreshToken = Array.isArray(request.headers[RefreshToken])
      ? request.headers[RefreshToken][0]
      : request.headers[RefreshToken];

    if (!accessToken || !refreshToken)
      throw new ForbiddenException('Token not found');

    try {
      const decodedAccessToken: TokenDto = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const user = await this.userService.findOneById(decodedAccessToken.id);
      request.user = user;
      return true;
    } catch (accessTokenError) {
      try {
        const decodedRefreshToken = this.jwtService.verify(refreshToken, {
          secret: this.configService.get('JWT_SECRET'),
        });
        const user = await this.userService.findOneById(decodedRefreshToken.id);
        request.user = user;
        request.needTokenRefresh = true;
        return true;
      } catch (refreshTokenError) {
        throw new UnauthorizedException('Token expired');
      }
    }
  }
}
