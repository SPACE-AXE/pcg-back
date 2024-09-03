import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { UserV2 } from '../user/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { roleDecoratorKey } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { Park } from '../park/entities/park.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const logger = new Logger(JwtAuthGuard.name);
    const request = context.switchToHttp().getRequest<Request>();
    const handler = context.getHandler();
    const contextClass = context.getClass();
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      roleDecoratorKey,
      [handler, contextClass],
    );

    if (!requiredRoles) {
      return true;
    }

    const accessToken = extractAccessToken(request);
    const refreshToken = extractRefreshToken(request);

    if (!accessToken) throw new ForbiddenException('Token not found');

    try {
      const decodedAccessToken = this.jwtService.verify<UserV2 | Park>(
        accessToken,
        {
          secret: this.configService.get('JWT_SECRET'),
        },
      );

      if (decodedAccessToken.role != Role.PARK)
        request.user = decodedAccessToken as UserV2;
      else request.park = decodedAccessToken as Park;
      return true;
    } catch (accessTokenError) {
      if (
        accessTokenError instanceof JsonWebTokenError &&
        accessTokenError.message == 'invalid signature'
      )
        throw new UnauthorizedException('Invalid Signature');
      try {
        const decodedRefreshToken = this.jwtService.verify<UserV2>(
          refreshToken,
          {
            secret: this.configService.get('JWT_SECRET'),
          },
        );
        request.user = decodedRefreshToken;
        request.needTokenRefresh = true;
        return true;
      } catch (refreshTokenError) {
        throw new UnauthorizedException('Token expired');
      }
    }
  }
}

function extractAccessToken(request: Request) {
  if (request.headers[AccessToken]) {
    return Array.isArray(request.headers[AccessToken])
      ? request.headers[AccessToken][0]
      : request.headers[AccessToken];
  } else return request.cookies[AccessToken];
}

function extractRefreshToken(request: Request) {
  if (request.headers[AccessToken]) {
    return Array.isArray(request.headers[RefreshToken])
      ? request.headers[RefreshToken][0]
      : request.headers[RefreshToken];
  } else return request.cookies[RefreshToken];
}
