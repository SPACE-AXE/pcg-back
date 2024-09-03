import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';

export const roleDecoratorKey = 'roles';

export function Roles(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(roleDecoratorKey, roles),
    ApiBearerAuth(),
    ApiForbiddenResponse({ description: '권한 없음' }),
  );
}
