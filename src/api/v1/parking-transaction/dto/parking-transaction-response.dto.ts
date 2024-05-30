import { OmitType } from '@nestjs/swagger';
import { CurrentParkingTransactionResponseDto } from './current-parking-transaction-response.dto';

export class ParkingTransactionResponseDto extends OmitType(
  CurrentParkingTransactionResponseDto,
  ['currentParkingTime'],
) {}
