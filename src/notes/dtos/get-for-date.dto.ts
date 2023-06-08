import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsHexadecimal, IsNotEmpty, IsString, Length } from 'class-validator';

export class GetForDateDto {
  @ApiProperty({
    type: String,
    description: 'Id стола для заметок',
  })
  @IsNotEmpty()
  @IsString()
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
