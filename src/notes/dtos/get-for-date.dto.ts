import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class GetNotesForDateDto {
  @ApiProperty({
    type: String,
    description: 'Id стола для заметок',
  })
  @IsNotEmpty()
  @IsMongoId()
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
