import { User } from "src/users/entities/users.entity";

export class AuthResponseDto {
    jwtToken: string;

    user: User;
}