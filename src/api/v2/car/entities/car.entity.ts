import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, name: 'car_num', unique: true })
  carNum: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  user: User;
}
