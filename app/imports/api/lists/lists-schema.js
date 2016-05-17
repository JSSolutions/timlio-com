import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseSchema } from '../schemas.js';

export const ListsSchema = new SimpleSchema([BaseSchema, {
  title: {
    type: String
  },
  boardId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
}]);