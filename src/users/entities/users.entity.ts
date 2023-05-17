import { Table } from "src/tables/entities/tables.entity";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    username:string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column((type) => Table)
    tables: Table[];

}