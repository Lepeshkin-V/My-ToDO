import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    description: "User's login",
    example: 'login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
    description: "User's password",
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
