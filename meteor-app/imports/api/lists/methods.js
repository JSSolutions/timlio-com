import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import ListsService from './lists-service';
import { BoardIdSchema, NameSchema } from '../schemas';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insert = new ValidatedMethod({
  name: 'Lists.insert',

  validate: new SimpleSchema([BoardIdSchema, NameSchema]).validator(),

  run({ boardId, name }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a list'
      );
    }
    
    ListsService.insert({ boardId, name });
  }
});

