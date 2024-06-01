import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '서버 상태 확인' })
  @ApiOkResponse({ description: '서버 상태 정상' })
  checkHealth() {
    return this.appService.checkHealth();
  }
}
