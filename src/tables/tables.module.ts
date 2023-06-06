import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/tables.entity';
import { TablesController } from './controllers/tables.controller';
import { TablesService } from './services/tables.service';
import { NotesModule } from 'src/notes/notes.module';
@Module({
  imports: [TypeOrmModule.forFeature([Table]), NotesModule],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TablesService],
})
export class TablesModule {}
