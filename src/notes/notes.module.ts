import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./entities/notes.entity";
import { NotesController } from "./controllers/notes.controller";
import { NotesService } from "./services/notes.service";

@Module({
    imports:[TypeOrmModule.forFeature([Note])],
    controllers: [NotesController],
    providers: [NotesService],
    
})

export class NotesModule {}