import { UserV1 } from '../../user/entities/user.entity';
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

  @OneToOne(() => UserV1, (user) => user.emailToken, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserV1;
}
