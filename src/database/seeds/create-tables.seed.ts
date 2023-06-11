import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/entities/users.entity';
import { rand } from '@ngneat/falso';
import { Table } from '../../tables/entities/tables.entity';

export default class CreateTables implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const users = await factory(User)().createMany(3);

    await factory(Table)()
      .map(async (table) => {
        table.userId = rand(users)._id.toHexString();
        return table;
      })
      .createMany(6);
  }
}
