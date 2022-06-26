import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class S3 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;
}
