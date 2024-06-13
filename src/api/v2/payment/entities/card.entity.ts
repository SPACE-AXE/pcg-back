import { User } from '../../user/entities/user.entity';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import crypto from 'crypto';
import 'dotenv/config';

@Entity('card')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  number: string;

  @Column({ length: 2, name: 'expiry_year' })
  expiryYear: string;

  @Column({ length: 2, name: 'expiry_month' })
  expiryMonth: string;

  @ManyToOne(() => User, (user) => user.card, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  async encryptNumber() {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(process.env.CARD_ENCRYPT_KEY),
      iv,
    );
    cipher.setAutoPadding(true);
    let encryptedNumber = cipher.update(this.number, 'utf-8', 'hex');
    encryptedNumber += cipher.final('hex');
    encryptedNumber += iv.toString('hex');
    this.number = encryptedNumber;
  }

  @AfterLoad()
  decryptNumber() {
    if (this.number) {
      const iv = Buffer.from(this.number.slice(-32), 'hex');
      this.number = this.number.slice(0, -32);
      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(process.env.CARD_ENCRYPT_KEY),
        iv,
      );
      decipher.setAutoPadding(true);
      let decryptedNumber = decipher.update(this.number, 'hex', 'utf-8');
      decryptedNumber += decipher.final('utf-8');
      this.number = decryptedNumber.trim();
    }
  }
}
