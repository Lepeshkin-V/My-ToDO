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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import MongoIdJoiValidationPipe from 'src/common/validators/id.validator';
import { CreateNoteRequestDto } from '../dtos/create-note-request.dto';
import { UpdateNoteRequestDto } from '../dtos/update-note-request.dto';
import { NoteResponseDto } from '../dtos/note-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBody({ type: CreateNoteRequestDto })
  @ApiResponse({ status: 201, type: NoteResponseDto })
  @Post()
  async create(@Body() input: CreateNoteRequestDto): Promise<NoteResponseDto> {
    const note = await this.notesService.create(input);

    return new NoteResponseDto(note);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: NoteResponseDto })
  @Get(':id')
  async getById(
    @Param('id', MongoIdJoiValidationPipe) noteId: string,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.findeOne(noteId);

    return new NoteResponseDto(note);
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateNoteRequestDto })
  @ApiResponse({ status: 200, type: NoteResponseDto })
  @Patch(':id')
  async update(
    @Param('id', MongoIdJoiValidationPipe) noteId: string,
    @Body() input: UpdateNoteRequestDto,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.update(noteId, input);

    return new NoteResponseDto(note);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async delete(
    @Param('id', MongoIdJoiValidationPipe) noteId: string,
  ): Promise<void> {
    await this.notesService.delete(noteId);
  }
}
