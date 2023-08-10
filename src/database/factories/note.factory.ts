import { Note } from '../../notes/entities/notes.entity';
import { define } from 'typeorm-seeding';
import { rand, randBetweenDate, randBoolean, randText } from '@ngneat/falso';
import { PriorityType } from '../../notes/enums';

define(Note, () => {
  const note = new Note();

  const startDate = new Date();
  const finishDate = new Date();
  finishDate.setDate(startDate.getDate() + 7);

  const prioryties = ['HIGH', 'MEDIUM', 'LOW', 'SIDE'];

  note.date = randBetweenDate({
    from: startDate,
    to: finishDate,
  });
  note.date.setHours(0, 0, 0, 0);
  note.text = randText();
  note.priority = PriorityType[rand(prioryties)];
  note.check = randBoolean();

  return note;
});
