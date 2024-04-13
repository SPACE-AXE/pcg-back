import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('park')
export class Park {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 15, unique: true })
  phone: string;

  @Column({ type: 'decimal', nullable: false })
  lat: number;

  @Column({ type: 'decimal', nullable: false })
  lng: number;

  @Column({ length: 100, nullable: false })
  address: string;

  @Column({ nullable: false })
  total_space: number;

  @Column({ nullable: false, default: 0 })
  car_space: number;

  @Column()
  disability_space: number;

  @Column({ length: 100, nullable: false })
  manage_code: string;
}
