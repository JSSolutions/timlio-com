import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PromisifiedMethod } from '../helpers';
import TimeTrackService from './time-track-entries-service';
import { CardIdSchema, IdSchema, BoardIdSchema, ListIdSchema, NameSchema, UserIdSchema, idSchemaDoc } from '../schemas';
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

export const getUserCardsTime = new ValidatedMethod({
  name: 'TimeTrackEntries.getUserCardsTime',
  
  validate: UserIdSchema.validator(),
  
  run({ userId }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user'
      );
    }
    
    if (this.isSimulation) {
      return;
    }

    return TimeTrackService.timeOnCards(userId);
  }
});

export const getUserBoardsTime = new ValidatedMethod({
  name: 'TimeTrackEntries.getUserBoardsTime',

  validate: UserIdSchema.validator(),

  run({ userId }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user'
      );
    }

    if (this.isSimulation) {
      return;
    }

    return TimeTrackService.timeOnBoards(userId);
  }
});

export const getUserTimeByDay = new ValidatedMethod({
  name: 'TimeTrackEntries.getUserTimeByDay',

  validate: new SimpleSchema(
    { 
      startDate: { type: Date }, 
      endDate: { type: Date },
      userIds: { type: [idSchemaDoc] },
      boardIds: { type: [idSchemaDoc] }
    }).validator(),

  run({ startDate, endDate, userIds, boardIds }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user'
      );
    }

    if (this.isSimulation) {
      return;
    }

    return TimeTrackService.betweenDates(startDate, endDate, userIds, boardIds);
  }
});