import { PickType } from '@nestjs/swagger';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends PickType(CreateTableDto, [
  'title',
] as const) {}
