import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const response = context.switchToHttp().getResponse() as Response;
    if (!request.cookies) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = request.cookies['access-token'];
    const refreshToken = request.cookies['refresh-token'];

    try {
      const decodedAccessToken = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const user = this.userService.findOne(decodedAccessToken.id);
      request.user = user;
      return true;
    } catch (accessTokenError) {
      try {
        const decodedRefreshToken = this.jwtService.verify(refreshToken, {
          secret: this.configService.get('JWT_SECRET'),
        });
        const user = this.userService.findOne(decodedRefreshToken.id);
        const newAccessToken = this.jwtService.sign(
          {
            username: decodedRefreshToken.username,
            id: decodedRefreshToken.id,
            nickname: decodedRefreshToken.nickname,
          },
          { secret: this.configService.get('JWT_SECRET'), expiresIn: '1h' },
        );
        request.user = user;
        response.cookie('access-token', newAccessToken, { httpOnly: true });
      } catch (refreshTokenError) {
        response.clearCookie('access-token');
        response.clearCookie('refresh-token');
        throw new UnauthorizedException('Token expired');
      }
    }
  }
}
