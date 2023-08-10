import { PickType } from '@nestjs/swagger';
import { CreateFeatureTableDto } from './create-feature-table.dto';

export class UpdateFeatureTableDto extends PickType(CreateFeatureTableDto, [
  'title',
] as const) {}
