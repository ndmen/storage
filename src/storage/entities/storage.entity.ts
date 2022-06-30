import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;
}
