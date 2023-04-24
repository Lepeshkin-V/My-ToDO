import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./notes/entities/notes.entity";
import { Card } from "./cards/entities/cards.entities";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mongodb',
        entities: [Note, Card],
    })],
})

export class AppModule {};