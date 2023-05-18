import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TablesService } from "../services/tables.service";
import { CreateTableDto } from "../dtos/create-table.dto";
import { Table } from "../entities/tables.entity";

@Controller('table')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    @Post('create')
    create(@Body() input: CreateTableDto): Promise<Table>{
        return this.tablesService.create(input);
    }

    @Get('byUser/:userId')
    getByUserId(@Param('userId') userId: string): Promise<Table[]> {
        return this.tablesService.getByUserId(userId);
    }

    @Get(':id')
    getById(@Param('id') tableId: string): Promise<Table> {
        return this.tablesService.getById(tableId);
    }

    @Patch(':id')
    update(@Param('id') tableId: string, @Body() title: string){
        return this.tablesService.update(tableId, title)
    }

    @Delete(':id')
    delete(@Param('id') tableId: string): Promise<boolean> {
        return this.tablesService.delete(tableId);
    }
}