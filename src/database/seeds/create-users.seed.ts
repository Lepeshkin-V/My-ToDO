import { User } from '../../users/entities/users.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class UsersSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    if (process.env.NODE_ENV != 'development') {
      return;
    }

    await factory(User)().create({ login: 'login', password: 'pass' });

    await factory(User)().createMany(2);
  }
}
