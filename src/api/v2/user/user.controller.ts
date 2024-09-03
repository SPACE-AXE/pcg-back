import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AccessToken, RefreshToken } from 'src/constants/constants';
import { UserResponseDto } from './dto/user-response.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@Roles(Role.USER)
@Controller({ path: 'user', version: '2' })
@ApiTags('사용자')
@ApiBearerAuth(AccessToken)
@ApiBearerAuth(RefreshToken)
@ApiUnauthorizedResponse({ description: '토큰 만료' })
@ApiBadRequestResponse({ description: '입력값 오류' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({
    description: '유저 정보 반환',
    type: UserResponseDto,
  })
  findOne(@Req() req: Request) {
    return this.userService.findOneById(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiOkResponse({ description: '유저 정보 수정 완료' })
  @ApiConflictResponse({ description: '특정 항목 중복' })
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
