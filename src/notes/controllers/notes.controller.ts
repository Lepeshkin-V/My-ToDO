import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { NotesService } from "../services/notes.service";
import { CreateNoteDto } from "../dtos/create-note.dto";
import { UpdateNoteDto } from "../dtos/update-note.dto";
import { GetForDateDto } from "../dtos/get-for-date.dto";

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @Post('create')
    async create(@Body() input: CreateNoteDto) {
        return this.notesService.create(input);
    }

    @Get(':id')
    async getById(@Param('id') noteId: string) {
        return this.notesService.findeOne(noteId);
    }

    @Post('week')
    async getWeek(@Body() input: GetForDateDto) {
        return this.notesService.findForWeek(input);
    }

    @Post('day')
    async getDay(@Body() input: GetForDateDto) {
        return this.notesService.findForDay(input);
    }

    @Patch(':id')
    async update(@Param('id') noteId: string, @Body() input: UpdateNoteDto) {
        return this.notesService.update(noteId, input);
    }

    @Delete(':id')
    async delete(@Param('id') noteId: string) {
        return this.notesService.delete(noteId);
    }

}
