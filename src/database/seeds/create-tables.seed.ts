import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/entities/users.entity';
import { rand } from '@ngneat/falso';
import { Table } from '../../tables/entities/tables.entity';

export default class TablesSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    if (process.env.NODE_ENV != 'development') {
      return;
    }

    const users = await factory(User)().createMany(3);

    await factory(Table)()
      .map(async (table) => {
        table.userId = rand(users)._id.toHexString();
        return table;
      })
      .createMany(6);
  }
}
