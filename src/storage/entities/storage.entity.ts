import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file: string;
}
