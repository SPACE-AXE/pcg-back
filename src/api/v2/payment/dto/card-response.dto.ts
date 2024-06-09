import { OmitType } from '@nestjs/swagger';
import { Card } from '../entities/card.entity';

export class CardResponseDto extends OmitType(Card, ['user']) {}
