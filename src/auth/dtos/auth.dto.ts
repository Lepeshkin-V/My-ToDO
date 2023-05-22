import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    description: "Логин пользователя",
    example: 'login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
    description: "Пароль пользователя",
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
