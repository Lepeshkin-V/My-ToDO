import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsHexadecimal,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class GetNotesForDateDto {
  @ApiProperty({
    type: String,
    description: 'Id стола для заметок',
  })
  @IsHexadecimal()
  @Length(24, 24)
  tableId: string;

  @ApiProperty({
    description: 'Дата заметок',
    example: '2023-05-21',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;
}
