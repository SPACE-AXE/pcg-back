import { OmitType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export default class LoginResponseDto extends OmitType(User, [
  'emailToken',
  'card',
]) {}
