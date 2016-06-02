import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import TimeTrackService from '../time-track-entries/time-track-entries-service';
import { CardIdSchema, IdSchema } from '../schemas';

export const insert = new ValidatedMethod({
  name: 'TimeTrackEntries.insert',

  validate: CardIdSchema.validator(),

  run({ cardId }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a time entry'
      );
    }

    return TimeTrackService.insert({ cardId, userId: this.userId });
  }
});

export const update = new ValidatedMethod({
  name: 'TimeTrackEntries.update',

  validate: IdSchema.validator(),

  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot update a time entry'
      );
    }
    return TimeTrackService.update(_id);
  }
});