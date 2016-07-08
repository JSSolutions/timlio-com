import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PromisifiedMethod } from '../helpers';
import ListsService from './lists-service';
import { BoardIdSchema, NameSchema } from '../schemas';
import { IdSchema } from '../schemas';

export const insert = PromisifiedMethod({
  name: 'Lists.insert',

  validate: new SimpleSchema([BoardIdSchema, NameSchema]).validator(),

  run({ boardId, name }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a list'
      );
    }
    
    return ListsService.insert({ boardId, name });
  }
});

export const update = PromisifiedMethod({
  name: 'Lists.update',

  validate: IdSchema.validator(),

  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot update a list'
      )
    }

    return ListsService.update({ _id });
  }
});

export const remove = PromisifiedMethod({
  name: 'Lists.remove',

  validate: IdSchema.validator(),

  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot remove a list'
      )
    }

    return ListsService.remove({ _id });
  }
});