import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexadecimal,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ObjectId } from 'mongodb';

interface TableResponse {
  _id: ObjectId;
  title: string;
  userId: string;
}

export class TableResponseDto {
  constructor(tableResponse: TableResponse) {
    (this.id = tableResponse._id),
      (this.title = tableResponse.title),
      (this.userId = tableResponse.userId);
  }
  @ApiProperty({
    type: ObjectId,
    description:
      'Id стола для заметок в виде шестнадцатеричной строки длиною 24.',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: ObjectId;

  @ApiProperty({
    type: String,
    description: 'Название стола для заметок',
    example: 'Для тренировок',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Id пользователя в виде шестнадцатеричной строки длиною 24.',
  })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
