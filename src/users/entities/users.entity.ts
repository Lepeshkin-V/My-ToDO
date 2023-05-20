import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import * as crypto from 'crypto';

@Entity()
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
}