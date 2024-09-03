import { OmitType } from '@nestjs/swagger';
import { UserV1 } from '../entities/user.entity';

export class UserResponseDto extends OmitType(UserV1, [
  'card',
  'emailToken',
  'password',
]) {}
