import { PriorityType } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNoteRequestDto {
  @ApiProperty({
    description: 'Дата для выполнения заметки',
    example: '2023-05-21',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({
    type: String,
    description: 'Id стола для заметок',
  })
  @IsNotEmpty()
  @IsMongoId()
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
    enum: PriorityType,
    enumName: 'PriorityType',
    nullable: false,
    example: PriorityType.SIDE,
  })
  @IsEnum(PriorityType)
  priority: PriorityType;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  check: boolean;
}
