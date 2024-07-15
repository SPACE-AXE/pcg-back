import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { AccessToken } from 'src/constants/constants';
import { TokenDto } from '../auth/dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      tap(() => {
        if (request.needTokenRefresh) {
          const user = request.user;
          const payload = Object.assign(
            {},
            new TokenDto({
              username: user.username,
              id: user.id,
              nickname: user.nickname,
            }),
          );
          const newAccessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '1h',
          });
          response.setHeader(AccessToken, newAccessToken);
        }
      }),
    );
  }
}
