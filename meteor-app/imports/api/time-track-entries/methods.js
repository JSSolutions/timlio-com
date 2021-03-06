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

export const getUserTimeByCard = PromisifiedMethod({
  name: 'TimeTrackEntries.getUserTimeByCard',
  
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

    return TimeTrackService.timeByCard(userId);
  }
});

export const getUserTimeByBoard = PromisifiedMethod({
  name: 'TimeTrackEntries.getUserTimeByBoard',

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

    return TimeTrackService.timeByBoard(startDate, endDate, userIds, boardIds);
  }
});

export const getUserTimeByDay = PromisifiedMethod({
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

    return TimeTrackService.timeByDay(startDate, endDate, userIds, boardIds);
  }
});

export const getUserTimeTrackStats = PromisifiedMethod({
  name: 'TimeTrackEntries.getUserTimeTrackStats',

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

    return {
      timeByBoard: TimeTrackService.timeByBoard(startDate, endDate, userIds, boardIds),
      timeByDay: TimeTrackService.timeByDay(startDate, endDate, userIds, boardIds)
    }
  }
});