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
import { TablesService } from '../services/tables.service';
import { CreateTableDto } from '../dtos/create-table.dto';
import { Table } from '../entities/tables.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateTableDto } from '../dtos/update-table.dto';

@Controller('table')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @ApiBody({ type: CreateTableDto })
  @ApiResponse({ status: 201, type: Table })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() input: CreateTableDto): Promise<Table> {
    return this.tablesService.create(input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: [Table] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('byUser/:userId')
  getByUserId(@Param('userId') userId: string): Promise<Table[]> {
    return this.tablesService.getByUserId(userId);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Table })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') tableId: string): Promise<Table> {
    return this.tablesService.getById(tableId);
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') tableId: string, @Body() input: UpdateTableDto) {
    return this.tablesService.update(tableId, input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') tableId: string): Promise<boolean> {
    return this.tablesService.delete(tableId);
  }
}
