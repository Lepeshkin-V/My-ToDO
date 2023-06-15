import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { Table } from 'src/tables/entities/tables.entity';
import { TablesService } from 'src/tables/services/tables.service';
import MongoIdJoiValidationPipe from 'src/common/validators/id.validator';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { TableResponseDto } from 'src/tables/dtos/table-response.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly tablesService: TablesService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: AuthRequestDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @Post('signIn')
  async signIn(@Body() input: AuthRequestDto): Promise<AuthResponseDto> {
    const authData = await this.authService.signIn({
      login: input.login,
      password: input.password,
    });
    return new AuthResponseDto({
      jwtToken: authData.jwtToken,
      userResponse: authData.user,
    });
  }

  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: AuthRequestDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @Post('signUp')
  async signUp(@Body() input: AuthRequestDto): Promise<AuthResponseDto> {
    const authData = await this.authService.signUp({
      login: input.login,
      password: input.password,
    });

    return new AuthResponseDto({
      jwtToken: authData.jwtToken,
      userResponse: authData.user,
    });
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: [TableResponseDto] })
  @UseGuards(JwtAuthGuard)
  @Get(':id/tables')
  async getByUserId(
    @Param('id', MongoIdJoiValidationPipe) userId: string,
  ): Promise<TableResponseDto[]> {
    const tablesByUser = await this.tablesService.getByUserId(userId);

    const tablesByUserResponse = tablesByUser.map((table) => {
      return new TableResponseDto(table);
    });

    return tablesByUserResponse;
  }
}
