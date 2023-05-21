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
import { GetForDateDto } from '../dtos/get-for-date.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Note } from '../entities/notes.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() input: CreateNoteDto) {
    return this.notesService.create(input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') noteId: string) {
    return this.notesService.findeOne(noteId);
  }

  @ApiBody({ type: GetForDateDto })
  @ApiResponse({ status: 200, type: [Note] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('week')
  async getWeek(@Body() input: GetForDateDto) {
    return this.notesService.findForWeek(input);
  }

  @ApiBody({ type: GetForDateDto })
  @ApiResponse({ status: 200, type: [Note] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('day')
  async getDay(@Body() input: GetForDateDto) {
    return this.notesService.findForDay(input);
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') noteId: string, @Body() input: UpdateNoteDto) {
    return this.notesService.update(noteId, input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') noteId: string) {
    return this.notesService.delete(noteId);
  }
}
