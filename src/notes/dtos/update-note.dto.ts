import { PriorityType } from "../enums";

export class UpdateNoteDto {
    date: Date;
    
    text: string;

    priority: PriorityType;

    check: boolean;
}