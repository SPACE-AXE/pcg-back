import { UserV2 } from '../../user/entities/user.entity';
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

  @OneToOne(() => UserV2, (user) => user.emailToken, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserV2;
}
