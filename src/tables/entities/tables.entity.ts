import { Card } from "src/cards/entities/cards.entities";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Table {
    @ObjectIdColumn()
    id: ObjectId;

    @Column((type) => Card)
    cards: Card[]

}
