import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { Request } from 'express';
import { roleDecoratorKey } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const logger = new Logger(RolesGuard.name);
    const handler = context.getHandler();
    const contextClass = context.getClass();
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      roleDecoratorKey,
      [handler, contextClass],
    );

    if (!requiredRoles) return true;
    const { user, park } = context.switchToHttp().getRequest<Request>();

    if (!user && !park) throw new UnauthorizedException();
    if (user && user.role == Role.ADMIN) return true;

    if (user) return requiredRoles.some((role) => role == user.role);
    else return requiredRoles.some((role) => role == park.role);
  }
}
