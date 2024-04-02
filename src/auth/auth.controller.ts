import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: '로그인 성공 (토큰은 쿠키로 발급)',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: '아이디 또는 비밀번호 틀림' })
  async login(@Req() req: Request, @Res() res: Response) {
    const userData = req.user as User;
    const { user, ...tokens } = await this.authService.login(userData);
    res
      .cookie('access-token', tokens.accessToken, { httpOnly: true })
      .cookie('refresh-token', tokens.refreshToken, { httpOnly: true })
      .send(user);
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: '회원가입 완료', type: User })
  @ApiConflictResponse({ description: '특정 항목 중복' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
