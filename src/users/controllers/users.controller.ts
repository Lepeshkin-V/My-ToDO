import { Body, Controller, Post } from "@nestjs/common";
import { AuthResponseDto } from "src/auth/dtos/auth-response.dto";
import { AuthDto } from "src/auth/dtos/auth.dto";
import { AuthService } from "src/auth/services/auth.services";

@Controller('users')
export class UsersController {
    constructor(private readonly authService: AuthService) {}

    @Post('signIn') 
    async signIn(@Body() input: AuthDto): Promise<AuthResponseDto>{
        return this.authService.signIn(input);
    }

    @Post('signUp')
    async signUp(@Body() input: AuthDto): Promise<AuthResponseDto> {
        return this.authService.signUp(input);
    }
}