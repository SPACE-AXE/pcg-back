import { UserV1 } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, name: 'car_num', unique: true })
  carNum: string;

  @ManyToOne(() => UserV1, (user) => user.id, { onDelete: 'SET NULL' })
  user: UserV1;
}
