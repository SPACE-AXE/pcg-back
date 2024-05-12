import { Car } from 'src/car/entities/car.entity';
import { Park } from 'src/park/entities/park.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('parking_transaction')
export class ParkingTransaction {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ name: 'entry_time' })
  entryTime: Date;
  @Column({ name: 'exit_time', type: 'datetime', nullable: true })
  exitTime: Date;
  @Column({ name: 'payment_time', type: 'datetime', nullable: true })
  paymentTime: Date;
  @Column({ name: 'charge_amount', type: 'int', nullable: true })
  chargeAmount: number;
  @Column({ type: 'int', nullable: true })
  amount: number;
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;
  @ManyToOne(() => Park, (park) => park.id)
  park: Park;
  @ManyToOne(() => Car, (car) => car.id)
  car: Car;
  @Column({ name: 'car_num', length: 15 })
  carNum: string;
}
