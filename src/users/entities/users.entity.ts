import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import * as crypto from 'crypto';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @BeforeUpdate()
  hashPasswordBeforeUpdate() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
}
