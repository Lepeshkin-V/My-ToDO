import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { ObjectId } from 'mongodb';

interface UserResponse {
  _id: ObjectId;
  login: string;
  password: string;
}

interface AuthResponse {
  jwtToken: string;
  userResponse: UserResponse;
}

export class AuthResponseDto {
  constructor(authResponse: AuthResponse) {
    (this.jwtToken = authResponse.jwtToken),
      (this.user = authResponse.userResponse);
  }

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
  user: UserResponse;
}
