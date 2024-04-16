import { Column, Entity, Point, PrimaryGeneratedColumn } from 'typeorm';

@Entity('park')
export class Park {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 15, unique: true })
  phone: string;

  @Column({ length: 100, nullable: false })
  address: string;

  @Column({ name: 'total_space', nullable: false })
  totalSpace: number;

  @Column({ name: 'car_space', nullable: false, default: 0 })
  carSpace: number;

  @Column({ name: 'disability_space' })
  disabilitySpace: number;

  @Column({ name: 'manage_code', length: 100, nullable: false })
  manageCode: string;

  @Column({ type: 'point', nullable: false })
  location: Point;
}
