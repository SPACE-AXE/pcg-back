import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { FindUsernameDto } from './dto/find-username.dto';
import { ResetEmailDto as ResetEmailDto } from './dto/reset-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginDto } from './dto/login.dto';
import LoginResponseDto from './dto/login-response.dto';

@Controller({ path: 'auth', version: '1' })
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
    type: LoginResponseDto,
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
  @ApiCreatedResponse({ description: '회원가입 완료' })
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
  @ApiOkResponse({ description: '아이디 조회 성공' })
  @ApiNotFoundResponse({ description: '사용자 없음' })
  @HttpCode(200)
  async findUsername(@Body() body: FindUsernameDto) {
    return (await this.userService.findOneByNameAndEmail(body)).username;
  }

  @Post('send-password-reset-email')
  @ApiOperation({
    summary: '비밀번호 초기화 이메일 발송',
    description:
      '토큰의 TTL은 5분입니다. 200 OK 응답이 반환되면, 이메일 발송에 성공한 것이므로 이메일을 확인해달라는 팝업과 함께 토큰/비밀번호/비밀번호 확인 텍스트를 받는 페이지로 리다이렉트하면 됩니다.',
  })
  @ApiOkResponse({ description: '비밀번호 변경을 위한 토큰 발급(이메일)' })
  @ApiNotFoundResponse({ description: '사용자 없음' })
  @ApiConflictResponse({ description: '이미 생성된 토큰이 있음' })
  @HttpCode(200)
  async sendResetEmail(@Body() body: ResetEmailDto) {
    return this.authService.sendResetEmail(body);
  }

  @Patch('reset-password')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiOkResponse({ description: '비밀번호 변경 성공' })
  @ApiUnauthorizedResponse({ description: '토큰 불일치 또는 토큰 만료' })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
}
