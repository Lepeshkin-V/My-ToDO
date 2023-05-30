import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetForDateDto {
  @ApiProperty({
    type: String,
    description: 'Id стола для заметок',
  })
  @IsNotEmpty()
  @IsString()
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
