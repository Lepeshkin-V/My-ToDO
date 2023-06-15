import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { AuthFeatureDto } from '../dtos/auth-feature.dto';
import { AuthResultDto } from '../dtos/auth-result.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(dto: AuthFeatureDto): Promise<AuthResultDto> {
    const { login, password } = dto;

    const hashPassword = crypto.createHmac('sha256', password).digest('hex');

    const user = await this.usersService.getByLoginAndPassword({
      login: login,
      password: hashPassword,
    });

    if (!user) {
      throw new UnauthorizedException('Wrong login or password');
    }

    const jwtToken = await this.jwtService.signAsync({ id: user._id });
    return { jwtToken, user };
  }

  async signUp(dto: AuthFeatureDto): Promise<AuthResultDto> {
    const { login, password } = dto;

    const isUser = await this.usersService.getOneByLogin(login);

    if (isUser) {
      throw new ForbiddenException('Login already exists');
    }

    const user = await this.usersService.create({ login, password });
    const jwtToken = await this.jwtService.signAsync({ id: user._id });

    return { jwtToken, user };
  }
}
