import { OmitType } from '@nestjs/swagger';
import { Car } from '../entities/car.entity';

export class CarResponseDto extends OmitType(Car, ['user']) {}
