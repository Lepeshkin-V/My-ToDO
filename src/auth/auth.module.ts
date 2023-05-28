import { Global, Module } from '@nestjs/common';
import { JwtStartegy } from './strategies/jwt.strategies';
import { AuthService } from './services/auth.services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JWTConfigService } from 'src/common/services/jwt-config.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
    UsersModule,
  ],
  providers: [JwtStartegy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
