import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';

export class AuthResponseDto {
  @ApiProperty({
    type: String,
    description: 'JSON Web Token',
  })
  jwtToken: string;

  @ApiProperty({
    description: 'Данные пользователя',
  })
  user: User;
}
