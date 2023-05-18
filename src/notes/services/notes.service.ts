import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "../entities/notes.entity";
import { DeleteResult, MongoRepository } from "typeorm";
import { CreateNoteDto } from "../dtos/create-note.dto";
import { UpdateNoteDto } from "../dtos/update-note.dto";
import { ObjectId } from "mongodb";
import { GetForDateDto } from "../dtos/get-for-date.dto";

@Injectable()
export class NotesService {

    constructor(@InjectRepository(Note) private readonly notesRepository: MongoRepository<Note>) {

    }

    async create(createNoteDto: CreateNoteDto): Promise<Note> {
        const note = await this.notesRepository.save({
            date: new Date(createNoteDto.date).toLocaleDateString(),
            tableId: createNoteDto.tableId,
            text: createNoteDto.text,
            priority: createNoteDto.priority
        });
        return note;
    }

    async findeOne(noteId: string): Promise<Note> {
        const note = ObjectId.isValid(noteId) && await this.notesRepository.findOneBy({ where: { _id: new ObjectId(noteId) } });
        if (!note) {
            console.log("Сущность с таким ID не найдена");
            throw new NotFoundException();
        }
        return note;
    }

    async findForWeek(getWeekDto: GetForDateDto): Promise<Note[]> {
        const dates: string[] = [];
        const currentDate = new Date(getWeekDto.date);
        for (let i = currentDate.getDate(); i < currentDate.getDate() + 7; i++) {
            const d = new Date();
            d.setDate(i);
            dates.push(d.toLocaleDateString());
        }
        console.log(dates);
        return await this.notesRepository.find({ where: { tableId: getWeekDto.tableId, date: { $in: dates } } });
    }

    async findForDay(getDayDto: GetForDateDto): Promise<Note[]> {
        const currentDate = new Date(getDayDto.date);
        return await this.notesRepository.find({ where: { tableId: getDayDto.tableId, date: currentDate.toLocaleDateString() } });
    }

    async update(noteId: string, updateNoteDto: UpdateNoteDto) {
        return await this.notesRepository.findOneAndUpdate({ _id: new ObjectId(noteId) }, { $set: updateNoteDto });;
    }

    async delete(noteId: string): Promise<boolean> {
        try {
            await this.notesRepository.deleteOne({ _id: new ObjectId(noteId) });
            return true;
        } catch (error) {
            return false;
        }
    }
}
