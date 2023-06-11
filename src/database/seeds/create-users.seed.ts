import { User } from '../../users/entities/users.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().create({ login: 'login', password: 'pass' });

    await factory(User)().createMany(2);
  }
}
