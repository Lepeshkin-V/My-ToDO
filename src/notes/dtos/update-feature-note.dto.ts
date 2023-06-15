import { PickType } from '@nestjs/swagger';
import { CreateFeatureNoteDto } from './create-feature-note.dto';

export class UpdateFeatureNoteDto extends PickType(CreateFeatureNoteDto, [
  'date',
  'text',
  'priority',
  'check',
] as const) {}
