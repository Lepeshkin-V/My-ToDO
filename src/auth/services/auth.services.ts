import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { AuthDto } from '../dtos/auth.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(signInDto: AuthDto): Promise<AuthResponseDto> {
    const password = crypto
      .createHmac('sha256', signInDto.password)
      .digest('hex');

    const user = await this.usersService.getByLoginAndPassword(
      signInDto.login,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('Wrong login or password');
    }

    const jwtToken = await this.jwtService.signAsync({ id: user._id });
    return { jwtToken, user };
  }

  async signUp(signUpDto: AuthDto): Promise<AuthResponseDto> {
    const isUser = await this.usersService.getOneByLogin(
      signUpDto.login,
    );

    if (isUser) {
      throw new ForbiddenException('Login already exists');
    }

    const user = await this.usersService.create(signUpDto);
    const jwtToken = await this.jwtService.signAsync({ id: user._id });

    return { jwtToken, user };
  }
}
