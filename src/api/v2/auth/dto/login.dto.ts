import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: '아이디' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
