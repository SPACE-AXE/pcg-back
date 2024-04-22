import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '이름' })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: '닉네임' })
  readonly nickname: string;

  @IsEmail()
  @ApiProperty({ description: '이메일', example: 'example@example.com' })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: '아이디' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @IsString()
  @ApiProperty({ description: '생일' })
  birth: Date;
}
