import { User } from 'src/api/v1/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('email_token')
export class EmailToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  token: string;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.emailToken)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
