import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./notes/entities/notes.entity";
import { Card } from "./cards/entities/cards.entities";
import { Table } from "./tables/entities/tables.entity";
import { User } from "./users/entities/users.entity";
import {DB_URL} from './config';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mongodb',
        url: DB_URL,
        database: "ToDo",
        entities: [Note, Card, Table, User],
    })],
})

export class AppModule {};