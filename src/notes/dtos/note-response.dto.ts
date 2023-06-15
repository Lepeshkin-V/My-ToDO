import { ApiProperty } from '@nestjs/swagger';
import { PriorityType } from '../enums';
import { ObjectId } from 'mongodb';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

interface NoteResponse {
  _id: ObjectId;
  tableId: string;
  date: Date;
  text: string;
  check: boolean;
  priority: PriorityType;
}

export class NoteResponseDto {
  constructor(noteResponse: NoteResponse) {
    this.id = noteResponse._id;
    this.tableId = noteResponse.tableId;
    this.date = noteResponse.date;
    this.text = noteResponse.text;
    this.check = noteResponse.check;
    this.priority = noteResponse.priority;
  }

  @ApiProperty({
    type: String,
    description: 'Id заметки в виде шестнадцатеричной строки длиною 24.',
  })
  id: ObjectId;

  @ApiProperty({
    type: String,
    description:
      'Id стола для заметок в виде шестнадцатеричной строки длиною 24.',
  })
  @IsNotEmpty()
  @IsMongoId()
  tableId: string;

  @ApiProperty({
    type: Date,
    description: 'Дата для выполнения заметки',
    example: '2023-05-21',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    type: String,
    description: 'Текст заметки',
    example: 'Нужно писать бэк',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  check: boolean;

  @ApiProperty({
    description: 'Важность заметки',
    enum: PriorityType,
    enumName: 'PriorityType',
    nullable: false,
    example: PriorityType.SIDE,
  })
  @IsEnum(PriorityType)
  priority: PriorityType;
}
