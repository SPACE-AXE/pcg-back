import { PartialType } from '@nestjs/swagger';
import { CreateParkDto } from './create-park.dto';

export class UpdateParkDto extends PartialType(CreateParkDto) {}
