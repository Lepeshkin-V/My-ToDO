import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class GetForDateDto {
  @ApiProperty({
    type: String,
    description: 'Id стола для заметок',
  })
  @IsNotEmpty()
  @IsString()
  tableId: string;

  @ApiProperty({
    type: Date,
    description: '',
    example: '2023-05-21T17:43:14.151Z',
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
