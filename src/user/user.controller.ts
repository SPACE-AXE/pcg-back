import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
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
} from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { UpdateResult } from 'typeorm';

@Controller('user')
@ApiTags('사용자')
@ApiBadRequestResponse({ description: '입력값 오류' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: '유저 정보 반환', type: User })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @ApiOkResponse({ description: '유저 정보 수정 완료', type: UpdateResult })
  @ApiConflictResponse({ description: '특정 항목 중복' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
