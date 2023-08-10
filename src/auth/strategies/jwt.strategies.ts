import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    return this.usersService.getOneOrFail(payload.id);
  }
}
