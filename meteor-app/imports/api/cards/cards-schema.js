import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseSchema } from '../schemas.js';

export const CardsSchema = new SimpleSchema([BaseSchema, {
  title: {
    type: String
  },
  listId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
}]);