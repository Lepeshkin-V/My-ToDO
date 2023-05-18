import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./notes/entities/notes.entity";
import { Table } from "./tables/entities/tables.entity";
import { User } from "./users/entities/users.entity";
import {DB_URL} from './config';
import { NotesModule } from "./notes/notes.module";
import { TablesModule } from "./tables/tables.module";

@Module({
    imports: [
        NotesModule,
        TablesModule,
        TypeOrmModule.forRoot({
        type: 'mongodb',
        url: DB_URL,
        database: "ToDo",
        entities: [Note, Table, User],
    })],
})

export class AppModule {};