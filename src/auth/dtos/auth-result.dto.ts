import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { User } from 'src/users/entities/users.entity';

export class AuthResultDto {
  @ApiProperty({
    type: String,
    description: 'JSON Web Token',
  })
  @IsNotEmpty()
  @IsJWT()
  jwtToken: string;

  @ApiProperty({
    description: 'Данные пользователя',
  })
  @IsNotEmptyObject()
  user: User;
}
