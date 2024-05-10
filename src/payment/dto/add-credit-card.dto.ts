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
  @IsNumberString()
  @ApiProperty({
    description:
      '카드 번호(실제 유효한 형식이 아니면 16자리 번호여도 오류가 발생함)',
    example: '1234123412341234',
  })
  number: string;
  @IsNumberString()
  @Length(2, 2)
  @IsNotEmpty()
  @ApiProperty({ description: '만료 연도', example: '24' })
  expiryYear: string;
  @IsNumberString()
  @Length(2, 2)
  @IsNotEmpty()
  @ApiProperty({ description: '만료 월', example: '12' })
  expiryMonth: string;
}
