import { EmailToken } from 'src/api/v1/auth/entities/email-token.entity';
import { Card } from 'src/api/v1/payment/entities/card.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 20, unique: true })
  nickname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 200 })
  password: string;

  @Column({ type: 'date' })
  birth: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: false })
  deletedAt: Date;

  @OneToOne(() => EmailToken, (emailToken) => emailToken.user)
  emailToken: EmailToken;

  @OneToOne(() => Card, (card) => card.user)
  card: Card;
}
