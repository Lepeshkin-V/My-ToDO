import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes/entities/notes.entity';
import { Table } from './tables/entities/tables.entity';
import { User } from './users/entities/users.entity';
import { DB_URL } from './config';
import { NotesModule } from './notes/notes.module';
import { TablesModule } from './tables/tables.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    NotesModule,
    TablesModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: DB_URL,
      database: 'ToDo',
      entities: [Note, Table, User],
    }),
  ],
})

export class AppModule {}
