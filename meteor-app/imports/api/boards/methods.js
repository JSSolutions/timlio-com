import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { BoardsSchema } from './boards-schema';
import BoardsService from './boards-service';

export const insert = new ValidatedMethod({
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
