import { OmitType } from '@nestjs/swagger';
import { ParkingTransaction } from '../entities/parking-transaction.entity';

export class ParkingTransactionResponseDto extends OmitType(
  ParkingTransaction,
  ['user', 'car', 'park'],
) {}
