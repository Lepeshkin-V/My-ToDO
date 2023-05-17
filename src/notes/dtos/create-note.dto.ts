import { ObjectId } from "typeorm";
import { PriorityType } from "../enums";

export class CreateNoteDto {
    date: Date;

    tableId: string;

    text: string;

    priority: PriorityType;

}