import { OmitType } from '@nestjs/swagger';
import { UserV2 } from '../entities/user.entity';

export class UserResponseDto extends OmitType(UserV2, [
  'card',
  'emailToken',
  'password',
]) {}
