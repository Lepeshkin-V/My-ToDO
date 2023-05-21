import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET_KEY } from 'src/config';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    return this.usersService.getOneOrFail(payload.id);
  }
}
