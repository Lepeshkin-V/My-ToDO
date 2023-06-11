import { Type } from 'class-transformer';
import { IsDate, IsDefined } from 'class-validator';

export class DateQueryDto {
  @IsDefined()
  @Type(() => Date)
  @IsDate()
  date: Date;
}
