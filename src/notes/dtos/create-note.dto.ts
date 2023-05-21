import { PriorityType } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    type: Date,
    description: 'Дата для выполнения заметки',
    example: '2023-05-21T17:43:14.151Z',
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({
    type: String,
    description: 'Id стола для заметок',
  })
  @IsNotEmpty()
  @IsString()
  tableId: string;

  @ApiProperty({
    type: String,
    description: 'Текст заметки',
    example: 'Нужно писать бэк',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Важность заметки',
    example: 'gray',
    default: PriorityType.SIDE,
  })
  @IsNotEmpty()
  priority: PriorityType;

  @ApiProperty({
    type: Boolean,
    default: false,
  })
  check: boolean = false;
}
