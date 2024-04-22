import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('사용자')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: '토큰 만료' })
@ApiBadRequestResponse({ description: '입력값 오류' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({ description: '유저 정보 반환', type: User })
  findOne(@Req() req: Request) {
    return this.userService.findOne(req.user);
  }

  @Patch()
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: '유저 정보 수정 완료', type: UpdateResult })
  @ApiConflictResponse({ description: '특정 항목 중복' })
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
