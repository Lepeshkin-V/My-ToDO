import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from 'src/auth/dtos/auth-response.dto';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { AuthService } from 'src/auth/services/auth.services';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiBearerAuth()
  @Post('signIn')
  async signIn(@Body() input: AuthDto): Promise<AuthResponseDto> {
    return this.authService.signIn(input);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiBearerAuth()
  @Post('signUp')
  async signUp(@Body() input: AuthDto): Promise<AuthResponseDto> {
    return this.authService.signUp(input);
  }
}
