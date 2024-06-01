import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '서버 상태 확인' })
  @ApiOkResponse({ description: '서버 상태 정상' })
  checkHealth(@Req() req: Request) {
    console.log(req.hostname);
    return this.appService.checkHealth();
  }
}
