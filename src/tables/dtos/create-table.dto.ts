import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTableDto {
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
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  userId: string;
}
