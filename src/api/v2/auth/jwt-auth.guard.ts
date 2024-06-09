import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
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
    const request = context.switchToHttp().getRequest() as Request;
    const response = context.switchToHttp().getResponse() as Response;

    const accessToken = request.cookies[AccessToken];
    const refreshToken = request.cookies[RefreshToken];

    if (!accessToken || !refreshToken)
      throw new ForbiddenException('Token not found');

    try {
      const decodedAccessToken = this.jwtService.verify(accessToken, {
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
        const newAccessToken = this.jwtService.sign(
          {
            username: decodedRefreshToken.username,
            id: decodedRefreshToken.id,
            nickname: decodedRefreshToken.nickname,
          },
          { secret: this.configService.get('JWT_SECRET'), expiresIn: '1h' },
        );
        request.user = user;
        response.cookie(AccessToken, newAccessToken, { httpOnly: true });
        return true;
      } catch (refreshTokenError) {
        response.clearCookie(AccessToken);
        response.clearCookie(RefreshToken);
        throw new UnauthorizedException('Token expired');
      }
    }
  }
}
