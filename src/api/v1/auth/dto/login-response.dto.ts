import { OmitType } from '@nestjs/swagger';
import { User } from 'src/api/v1/user/entities/user.entity';

export default class LoginResponseDto extends OmitType(User, [
  'emailToken',
  'card',
]) {}
