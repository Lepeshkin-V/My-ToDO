import { randSentence } from '@ngneat/falso';
import { Table } from '../../tables/entities/tables.entity';
import { define } from 'typeorm-seeding';

define(Table, () => {
  const table = new Table();

  table.title = randSentence();

  return table;
});
