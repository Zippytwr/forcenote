import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    id?: string
    title?: string
    content: string
    create_at?: Date
    updated_at?: Date
}
