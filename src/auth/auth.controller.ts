import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
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
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { FindUsernameDto } from './dto/find-username.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('인증')
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
      .cookie(AccessToken, tokens.accessToken, { httpOnly: true })
      .cookie(RefreshToken, tokens.refreshToken, { httpOnly: true })
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

  @Get('check-username-duplicate/:username')
  @ApiOperation({ summary: '아이디 중복 확인' })
  @ApiParam({ name: 'username', description: '아이디' })
  @ApiOkResponse({ description: '아이디 사용 가능 (Body 없음)' })
  @ApiConflictResponse({ description: '아이디 중복' })
  async checkUserNameDuplicate(@Param('username') username: string) {
    const user = await this.userService.findOneByUserName(username);
    if (!user) return;
    else throw new ConflictException('Username already exists');
  }

  @Post('find-username')
  @ApiOperation({ summary: '아이디 찾기' })
  @ApiBody({ type: FindUsernameDto })
  @ApiOkResponse({ description: '아이디 조회 성공' })
  @ApiConflictResponse({ description: '사용자 없음' })
  @HttpCode(200)
  async findUsername(@Body() body: FindUsernameDto) {
    return (await this.userService.findOneByNameAndEmail(body)).username;
  }

  @Post('send-password-reset-email')
  @ApiOperation({ summary: '비밀번호 초기화' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({ description: '비밀번호 초기화 성공' })
  @ApiConflictResponse({ description: '사용자 없음' })
  @HttpCode(200)
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.sendResetEmail(body);
  }
}
