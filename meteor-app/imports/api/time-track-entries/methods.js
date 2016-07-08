import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PromisifiedMethod } from '../helpers';
import TimeTrackService from './time-track-entries-service';
import { CardIdSchema, IdSchema, BoardIdSchema, ListIdSchema, NameSchema } from '../schemas';
import ListsService from '../lists/lists-service';
import BoardsService from '../boards/boards-service';
import CardsService from '../cards/cards-service';

export const insert = PromisifiedMethod({
  name: 'TimeTrackEntries.insert',

  validate: new SimpleSchema([CardIdSchema, BoardIdSchema, ListIdSchema, NameSchema]).validator(),

  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a time entry'
      );
    }

    CardsService.createIfNotExists(doc);
    
    ListsService.createIfNotExists(doc.listId);
    
    BoardsService.createIfNotExists(doc.boardId);
        
    return TimeTrackService.insert({ cardId: doc.cardId, userId: this.userId });
  }
});

export const update = PromisifiedMethod({
  name: 'TimeTrackEntries.update',

  validate: IdSchema.validator(),

  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot update a time entry'
      );
    }
    
    return TimeTrackService.update({ _id });
  }
});