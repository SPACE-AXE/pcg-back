import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUsernameDto {
  @ApiProperty({ description: '사용자 실명' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '사용자 이메일', example: 'example@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
