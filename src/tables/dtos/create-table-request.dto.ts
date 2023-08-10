import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexadecimal,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateTableRequestDto {
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
  @IsMongoId()
  userId: string;
}
