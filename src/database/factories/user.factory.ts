import { randPassword, randUserName } from '@ngneat/falso';
import { User } from '../../users/entities/users.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();

  user.login = randUserName();
  user.password = randPassword();

  return user;
});
