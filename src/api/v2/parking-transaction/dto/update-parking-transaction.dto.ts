import { PartialType } from '@nestjs/swagger';
import { CreateParkingTransactionDto } from './create-parking-transaction.dto';

export class UpdateParkingTransactionDto extends PartialType(
  CreateParkingTransactionDto,
) {}
