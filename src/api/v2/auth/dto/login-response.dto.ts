import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export default class LoginResponseDto extends OmitType(User, [
  'emailToken',
  'card',
]) {
  @ApiProperty({ description: '액세스 토큰' })
  accessToken: string;
  @ApiProperty({ description: '리프레시 토큰' })
  refreshToken: string;
}
