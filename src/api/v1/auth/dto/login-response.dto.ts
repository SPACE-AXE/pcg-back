import { OmitType } from '@nestjs/swagger';
import { UserV1 } from '../../user/entities/user.entity';

export default class LoginResponseDto extends OmitType(UserV1, [
  'emailToken',
  'card',
]) {}
