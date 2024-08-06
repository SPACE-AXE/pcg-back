import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../car/entities/car.entity';
import { Park } from '../../park/entities/park.entity';
import { User } from '../../user/entities/user.entity';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KR_TIME_DIFF } from 'src/constants/constants';

@Entity('parking_transaction')
export class ParkingTransaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'entry_time', type: 'bigint', nullable: false })
  entryTime: number;
  @Column({ name: 'exit_time', type: 'bigint', nullable: true })
  exitTime: number;
  @Column({ name: 'charge_start_time', type: 'bigint', nullable: true })
  chargeStartTime: number;
  @Column({ name: 'charge_time', nullable: true })
  chargeTime: number;
  @Column({ name: 'payment_time', type: 'bigint', nullable: true })
  paymentTime: number;
  @Column({ name: 'charge_amount', type: 'int', nullable: true })
  chargeAmount: number;
  @Column({ name: 'parking_amount', type: 'int', nullable: true })
  parkingAmount: number;
  @Column({ name: 'total_amount', type: 'int', nullable: true })
  totalAmount: number;
  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: User;
  @ManyToOne(() => Park, (park) => park.id, { onDelete: 'SET NULL' })
  park: Park;
  @ManyToOne(() => Car, (car) => car.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  car: Car;
  @Column({ name: 'car_num', length: 15 })
  carNum: string;
  @Column({ name: 'is_paid', default: false, type: 'boolean' })
  isPaid: boolean;
  @Column({ name: 'payment_id', unique: true, length: 36 })
  paymentId: string;

  @AfterLoad()
  convertUTCtoKST() {
    if (this.entryTime) {
      this.entryTime = this.entryTime + KR_TIME_DIFF;
    }
    if (this.exitTime) {
      this.exitTime = this.exitTime + KR_TIME_DIFF;
    }
    if (this.chargeStartTime) {
      this.chargeStartTime = this.chargeStartTime + KR_TIME_DIFF;
    }
    if (this.paymentTime) {
      this.paymentTime = this.paymentTime + KR_TIME_DIFF;
    }
  }

  @ApiProperty({ description: '현재 주차 시간(초 단위)' })
  currentParkingTime: number;
}
