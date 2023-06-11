import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from 'src/auth/dtos/auth-response.dto';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth.services';
import { Table } from 'src/tables/entities/tables.entity';
import { TablesService } from 'src/tables/services/tables.service';
import MongoIdJoiValidationPipe from 'src/common/validators/id.validator';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly tablesService: TablesService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @Post('signIn')
  async signIn(@Body() input: AuthDto): Promise<AuthResponseDto> {
    return this.authService.signIn(input);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @Post('signUp')
  async signUp(@Body() input: AuthDto): Promise<AuthResponseDto> {
    return this.authService.signUp(input);
  }

  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: [Table] })
  @UseGuards(JwtAuthGuard)
  @Get(':id/tables')
  getByUserId(
    @Param('id', MongoIdJoiValidationPipe) userId: string,
  ): Promise<Table[]> {
    return this.tablesService.getByUserId(userId);
  }
}
