import { PickType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PickType(CreateNoteDto, [
  'date',
  'text',
  'priority',
  'check',
] as const) {}
