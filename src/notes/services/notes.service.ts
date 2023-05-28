import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entities/notes.entity';
import { MongoRepository } from 'typeorm';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { UpdateNoteDto } from '../dtos/update-note.dto';
import { ObjectId } from 'mongodb';
import { GetForDateDto } from '../dtos/get-for-date.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: MongoRepository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesRepository.save({
      date: new Date(createNoteDto.date).toLocaleDateString(),
      tableId: createNoteDto.tableId,
      text: createNoteDto.text,
      priority: createNoteDto.priority,
      check: false,
    });
  }

  async findeOne(noteId: string): Promise<Note> {
    const note =
      ObjectId.isValid(noteId) &&
      (await this.notesRepository.findOneBy({
        where: { _id: new ObjectId(noteId) },
      }));
    if (!note) {
      throw new NotFoundException('Сущность с таким ID не найдена');
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
    return this.notesRepository.find({
      where: { tableId: getWeekDto.tableId, date: { $in: dates } },
      order:{
        date: "ASC"
      }
    });
  }

  async findForDay(getDayDto: GetForDateDto): Promise<Note[]> {
    const currentDate = new Date(getDayDto.date);
    return this.notesRepository.find({
      where: {
        tableId: getDayDto.tableId,
        date: currentDate.toLocaleDateString(),
      },
    });
  }

  async update(noteId: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.notesRepository.save({
      _id: new ObjectId(noteId),
      ...updateNoteDto,
    });
  }

  async delete(noteId: string): Promise<void> {
    this.notesRepository.deleteOne({ _id: new ObjectId(noteId) });
  }
}
