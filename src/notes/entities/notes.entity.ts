import {Column, CreateDateColumn, Entity, ObjectIdColumn} from 'typeorm';
import {PriorityType} from '../enums';

@Entity()
export class Note {

    @ObjectIdColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    check: boolean;

    @Column()
    priority: PriorityType;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}