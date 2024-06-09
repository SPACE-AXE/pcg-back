import { OmitType } from '@nestjs/swagger';
import { ParkingTransaction } from '../entities/parking-transaction.entity';

export class CurrentParkingTransactionResponseDto extends OmitType(
  ParkingTransaction,
  ['user', 'car', 'park'],
) {}
