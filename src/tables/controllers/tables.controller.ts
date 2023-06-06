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
import { CreateTableDto } from '../dtos/create-table.dto';
import { Table } from '../entities/tables.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateTableDto } from '../dtos/update-table.dto';
import { NotesService } from 'src/notes/services/notes.service';
import { Note } from 'src/notes/entities/notes.entity';
import { DateQueryDto } from '../dtos/date-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('tables')
export class TablesController {
  constructor(
    private readonly tablesService: TablesService,
    private readonly notesService: NotesService,
  ) { }

  @ApiBody({ type: CreateTableDto })
  @ApiResponse({ status: 201, type: Table })
  @Post()
  async create(@Body() input: CreateTableDto): Promise<Table> {
    return this.tablesService.create(input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Table })
  @Get(':id')
  async getById(@Param('id') tableId: string): Promise<Table> {
    return this.tablesService.getById(tableId);
  }

  @ApiQuery({ name: 'date', type: Date })
  @ApiResponse({ status: 200, type: [Note] })
  @Get(':id/notes/week')
  async getWeek(
    @Param('id') tableId: string,
    @Query() query: DateQueryDto,
  ): Promise<Note[]> {
    return this.notesService.findForWeek({
      tableId: tableId,
      date: query.date,
    });
  }

  @ApiQuery({ name: 'date', type: Date })
  @ApiResponse({ status: 200, type: [Note] })
  @Get(':id/notes/day')
  async getDay(
    @Param('id') tableId: string,
    @Query() query: DateQueryDto,
  ): Promise<Note[]> {
    return this.notesService.findForDay({
      tableId: tableId, 
      date: query.date
    });
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateTableDto })
  @ApiResponse({ status: 200 })
  @Patch(':id')
  async update(
    @Param('id') tableId: string,
    @Body() input: UpdateTableDto,
  ): Promise<Table> {
    return this.tablesService.update(tableId, input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async delete(@Param('id') tableId: string): Promise<void> {
    await this.tablesService.delete(tableId);
  }
}
