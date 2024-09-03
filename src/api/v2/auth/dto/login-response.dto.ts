import { OmitType } from '@nestjs/swagger';
import { UserV2 } from '../../user/entities/user.entity';

export default class LoginResponseDto extends OmitType(UserV2, [
  'emailToken',
  'card',
]) {}
