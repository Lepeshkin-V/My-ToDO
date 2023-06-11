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
  check: boolean;

  @Column({
    type: 'enum',
    enum: PriorityType,
    default: PriorityType.SIDE,
  })
  priority: PriorityType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
