import { Column, Entity, Point, PrimaryGeneratedColumn } from 'typeorm';

@Entity('park')
export class Park {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 15, unique: true })
  phone: string;

  @Column({ length: 100 })
  address: string;

  @Column({ name: 'total_space' })
  totalSpace: number;

  @Column({ name: 'car_space', default: 0 })
  carSpace: number;

  @Column({ name: 'disability_space' })
  disabilitySpace: number;

  @Column({ name: 'manage_code', length: 100 })
  manageCode: string;

  @Column({ type: 'point' })
  location: Point;

  @Column({ length: 20, select: false })
  ip: string;
}
