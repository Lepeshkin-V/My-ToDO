
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Table {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    title: string;

    @Column()
    userId: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}
