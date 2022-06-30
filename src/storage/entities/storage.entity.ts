import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'id' })
  @ManyToOne(() => User)
  user_id: number;

  @Column()
  path: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;
}
