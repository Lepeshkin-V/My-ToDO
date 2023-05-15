import { type } from "os";
import { Note } from "src/notes/entities/notes.entity";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Card {
    @ObjectIdColumn({type: 'timestamp'})
    date: Date;

    @Column((type) => Note)
    notes: Note[];

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}