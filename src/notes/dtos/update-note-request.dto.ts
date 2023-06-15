import { PickType } from '@nestjs/swagger';
import { CreateNoteRequestDto } from './create-note-request.dto';

export class UpdateNoteRequestDto extends PickType(CreateNoteRequestDto, [
  'date',
  'text',
  'priority',
  'check',
] as const) {}
