import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PromisifiedMethod } from '../helpers';
import { BoardsSchema } from './boards-schema';
import BoardsService from './boards-service';
import { IdSchema } from '../schemas';

export const insert = PromisifiedMethod({
  name: 'Boards.insert',
  
  validate: BoardsSchema.validator(),
  
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a board'
      );
    }
    
    return BoardsService.insert(doc);
  }
});

export const update = PromisifiedMethod({
  name: 'Boards.update',
  
  validate: IdSchema.validator(),
  
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot update a board'
      );
    }

    return BoardsService.update({ _id });
  }
});

export const remove = PromisifiedMethod({
  name: 'Boards.remove',
  
  validate: IdSchema.validator(),
  
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot remove a board'
      );
    }

    return BoardsService.remove({ _id });
  }
});
