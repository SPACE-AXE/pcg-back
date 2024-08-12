import { OmitType } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export default class LoginResponseDto extends OmitType(User, [
  'emailToken',
  'card',
]) {}
