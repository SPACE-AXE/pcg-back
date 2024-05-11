import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('card')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  number: string;

  @Column({ length: 2, name: 'expiry_year' })
  expiryYear: string;

  @Column({ length: 2, name: 'expiry_month' })
  expiryMonth: string;

  @OneToOne(() => User, (user) => user.id)
  user: User;
}
