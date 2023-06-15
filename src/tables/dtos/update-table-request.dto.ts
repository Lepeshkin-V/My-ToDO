import { PickType } from '@nestjs/swagger';
import { CreateTableRequestDto } from './create-table-request.dto';

export class UpdateTableRequestDto extends PickType(CreateTableRequestDto, [
  'title',
] as const) {}
