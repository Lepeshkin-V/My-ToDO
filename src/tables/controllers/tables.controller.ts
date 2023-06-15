import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TablesService } from '../services/tables.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { NotesService } from 'src/notes/services/notes.service';
import { DateQueryDto } from '../dtos/date-query.dto';
import MongoIdJoiValidationPipe from 'src/common/validators/id.validator';
import { CreateTableRequestDto } from '../dtos/create-table-request.dto';
import { UpdateTableRequestDto } from '../dtos/update-table-request.dto';
import { TableResponseDto } from '../dtos/table-response.dto';
import { NoteResponseDto } from 'src/notes/dtos/note-response.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('tables')
export class TablesController {
  constructor(
    private readonly tablesService: TablesService,
    private readonly notesService: NotesService,
  ) {}

  @ApiBody({ type: CreateTableRequestDto })
  @ApiResponse({ status: 201, type: TableResponseDto })
  @Post()
  async create(
    @Body() input: CreateTableRequestDto,
  ): Promise<TableResponseDto> {
    const table = await this.tablesService.create({
      title: input.title,
      userId: input.userId,
    });

    return new TableResponseDto(table);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: TableResponseDto })
  @Get(':id')
  async getById(
    @Param('id', MongoIdJoiValidationPipe) tableId: string,
  ): Promise<TableResponseDto> {
    const table = await this.tablesService.getById(tableId);

    return new TableResponseDto(table);
  }

  @ApiQuery({ name: 'date', type: Date })
  @ApiResponse({ status: 200, type: [NoteResponseDto] })
  @Get(':id/notes/week')
  async getWeek(
    @Param('id', MongoIdJoiValidationPipe) tableId: string,
    @Query() query: DateQueryDto,
  ): Promise<NoteResponseDto[]> {
    const notes = await this.notesService.findForWeek({
      tableId: tableId,
      date: query.date,
    });

    const responseNotes = notes.map((note) => {
      return new NoteResponseDto(note);
    });

    return responseNotes;
  }

  @ApiQuery({ name: 'date', type: Date })
  @ApiResponse({ status: 200, type: [NoteResponseDto] })
  @Get(':id/notes/day')
  async getDay(
    @Param('id', MongoIdJoiValidationPipe) tableId: string,
    @Query() query: DateQueryDto,
  ): Promise<NoteResponseDto[]> {
    const notes = await this.notesService.findForDay({
      tableId: tableId,
      date: query.date,
    });

    const responseNotes = notes.map((note) => {
      return new NoteResponseDto(note);
    });

    return responseNotes;
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateTableRequestDto })
  @ApiResponse({ status: 200, type: TableResponseDto })
  @Patch(':id')
  async update(
    @Param('id', MongoIdJoiValidationPipe) tableId: string,
    @Body() input: UpdateTableRequestDto,
  ): Promise<TableResponseDto> {
    const table = await this.tablesService.update(tableId, input);

    return new TableResponseDto(table);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async delete(
    @Param('id', MongoIdJoiValidationPipe) tableId: string,
  ): Promise<void> {
    await this.tablesService.delete(tableId);
  }
}
