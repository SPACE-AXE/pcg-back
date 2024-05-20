import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PayDto {
  @IsUUID('4')
  @ApiProperty({ description: '결제 ID' })
  paymentId: string;
}
