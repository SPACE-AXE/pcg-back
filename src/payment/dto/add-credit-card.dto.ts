import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsNotEmpty,
  IsNumberString,
  Length,
} from 'class-validator';

export class AddCreditCardDto {
  @IsCreditCard()
  @IsNotEmpty()
  @ApiProperty({ description: '카드 번호', example: '1234-1234-1234-1234' })
  number: string;
  @IsNumberString()
  @Length(2, 2)
  @ApiProperty({ description: '만료 연도', example: '24' })
  expiryYear: string;
  @IsNumberString()
  @Length(2, 2)
  @ApiProperty({ description: '만료 월', example: '12' })
  expiryMonth: string;
}
