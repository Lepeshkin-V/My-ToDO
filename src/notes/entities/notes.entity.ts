import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';
import { PriorityType } from '../enums';

@Entity({ name: 'notes' })
export class Note {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  tableId: string;

  @Column()
  date: string;

  @Column()
  text: string;

  @Column()
  check: boolean = false;

  @Column()
  priority: PriorityType = PriorityType.SIDE;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
