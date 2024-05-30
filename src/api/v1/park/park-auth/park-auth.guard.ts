import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ParkService } from '../park.service';

@Injectable()
export class ParkAuthGuard implements CanActivate {
  constructor(private readonly parkService: ParkService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const manageCode = request.headers['manage-code'];
    if (!manageCode) {
      return false;
    }
    if (typeof manageCode === 'string') {
      await this.parkService.getInfoByManageCode(manageCode);
      return true;
    }
    return false;
  }
}
