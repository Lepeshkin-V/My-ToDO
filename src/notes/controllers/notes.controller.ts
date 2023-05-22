import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { UpdateNoteDto } from '../dtos/update-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Note } from '../entities/notes.entity';

@ApiBearerAuth()
@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {}

  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, type: Note })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() input: CreateNoteDto): Promise<Note> {
    return this.notesService.create(input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Note })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') noteId: string): Promise<Note> {
    return this.notesService.findeOne(noteId);
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') noteId: string, @Body() input: UpdateNoteDto): Promise<Note> {
    return this.notesService.update(noteId, input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') noteId: string): Promise<void> {
    await this.notesService.delete(noteId);
  }
}
