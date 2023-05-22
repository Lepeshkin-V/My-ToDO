import { JWT_SECRET_KEY } from './../config/index';
import { Global, Module } from '@nestjs/common';
import { JwtStartegy } from './strategies/jwt.strategies';
import { AuthService } from './services/auth.services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '3h' },
    }),
    UsersModule,
  ],
  providers: [JwtStartegy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
