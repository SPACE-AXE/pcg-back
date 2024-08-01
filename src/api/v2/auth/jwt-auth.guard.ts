import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { UserService } from '../user/user.service';

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
      const decodedAccessToken = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request.user = decodedAccessToken;
      return true;
    } catch (accessTokenError) {
      if (
        accessTokenError instanceof JsonWebTokenError &&
        accessTokenError.message == 'invalid signature'
      )
        throw new UnauthorizedException('Invalid Signature');
      try {
        const decodedRefreshToken = this.jwtService.verify(refreshToken, {
          secret: this.configService.get('JWT_SECRET'),
        });
        request.user = decodedRefreshToken;
        request.needTokenRefresh = true;
        return true;
      } catch (refreshTokenError) {
        throw new UnauthorizedException('Token expired');
      }
    }
  }
}
