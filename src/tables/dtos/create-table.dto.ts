import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { type } from 'os';

export class CreateTableDto {
  @ApiProperty({
    type: String,
    description: 'Название стола для заметок',
    example: 'Классное название',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Id пользователя',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
