import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: '사용자 이메일', example: 'maitmus@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ description: '사용자 아이디' })
  @IsString()
  username: string;
}
