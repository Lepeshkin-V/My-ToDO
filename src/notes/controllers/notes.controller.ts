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
import MongoIdJoiValidationPipe from 'src/common/validators/id.validator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, type: Note })
  @Post()
  async create(@Body() input: CreateNoteDto): Promise<Note> {
    return this.notesService.create(input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Note })
  @Get(':id')
  async getById(@Param('id', MongoIdJoiValidationPipe) noteId: string): Promise<Note> {
    return this.notesService.findeOne(noteId);
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200 })
  @Patch(':id')
  async update(
    @Param('id', MongoIdJoiValidationPipe) noteId: string,
    @Body() input: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(noteId, input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async delete(@Param('id', MongoIdJoiValidationPipe) noteId: string): Promise<void> {
    await this.notesService.delete(noteId);
  }
}
