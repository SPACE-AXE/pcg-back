import { IsString } from 'class-validator';

export class ParkLoginDto {
  @IsString()
  manageCode: string;
}
