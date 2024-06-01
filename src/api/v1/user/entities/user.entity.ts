import { EmailToken } from 'src/api/v1/auth/entities/email-token.entity';
import { Card } from 'src/api/v1/payment/entities/card.entity';
import { KR_TIME_DIFF } from 'src/constants/constants';
import {
  AfterLoad,
  Column,
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

  @Column({ length: 200, select: false })
  password: string;

  @Column({ type: 'date' })
  birth: Date;

  @Column({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt: Date;

  @OneToOne(() => EmailToken, (emailToken) => emailToken.user)
  emailToken: EmailToken;

  @OneToOne(() => Card, (card) => card.user)
  card: Card;

  @AfterLoad()
  convertUSTtoKST() {
    if (this.createdAt) {
      this.createdAt = new Date(this.createdAt.getTime() + KR_TIME_DIFF);
    }
    if (this.deletedAt) {
      this.deletedAt = new Date(this.deletedAt.getTime() + KR_TIME_DIFF);
    }
  }
}
