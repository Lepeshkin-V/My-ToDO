import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/entities/users.entity';
import { Table } from '../../tables/entities/tables.entity';
import { Note } from '../../notes/entities/notes.entity';
import { rand } from '@ngneat/falso';

export default class CreateNotes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    connection.getMongoRepository(User).clear();
    connection.getMongoRepository(Table).clear();
    connection.getMongoRepository(Note).clear();

    const users = await factory(User)().createMany(5);

    const tables = await factory(Table)()
      .map(async (table) => {
        table.userId = rand(users)._id.toHexString();
        return table;
      })
      .createMany(10);

    await factory(Note)()
      .map(async (note) => {
        note.tableId = rand(tables)._id.toHexString();
        return note;
      })
      .createMany(40);
  }
}
