import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entities/notes.entity';
import { MongoRepository } from 'typeorm';
import { CreateFeatureNoteDto } from '../dtos/create-feature-note.dto';
import { UpdateFeatureNoteDto } from '../dtos/update-feature-note.dto';
import { ObjectId } from 'mongodb';
import { GetNotesForDateDto } from '../dtos/get-for-date.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: MongoRepository<Note>,
  ) {}

  async create(dto: CreateFeatureNoteDto): Promise<Note> {
    const { date, tableId, text, priority } = dto;

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    const note = await this.notesRepository.save({
      date: currentDate,
      tableId: tableId,
      text: text,
      priority: priority,
      check: false,
    });

    return note;
  }

  async findeOne(noteId: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({
      where: { _id: new ObjectId(noteId) },
    });

    if (!note) {
      throw new NotFoundException('Сущность с таким ID не найдена');
    }

    return note;
  }

  async findForWeek(getWeekDto: GetNotesForDateDto): Promise<Note[]> {
    const startDate = new Date(getWeekDto.date);
    startDate.setHours(0, 0, 0, 0);
    const finishDate = new Date();
    finishDate.setDate(startDate.getDate() + 7);
    finishDate.setHours(0, 0, 0, 0);

    const notes = await this.notesRepository.find({
      where: {
        tableId: getWeekDto.tableId,
        date: { $gt: startDate, $lt: finishDate },
      },
      order: {
        date: 'ASC',
      },
    });

    return notes;
  }

  async findForDay(dto: GetNotesForDateDto): Promise<Note[]> {
    const { tableId, date } = dto;

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    const notes = await this.notesRepository.find({
      where: {
        tableId: tableId,
        date: currentDate,
      },
    });

    return notes;
  }

  async update(noteId: string, dto: UpdateFeatureNoteDto): Promise<Note> {
    const { date, text, priority, check } = dto;

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    const note = await this.notesRepository.save({
      _id: new ObjectId(noteId),
      date: currentDate,
      text: text,
      priority: priority,
      check: check,
    });

    return note;
  }

  async delete(noteId: string): Promise<void> {
    await this.notesRepository.deleteOne({ _id: new ObjectId(noteId) });
  }
}
