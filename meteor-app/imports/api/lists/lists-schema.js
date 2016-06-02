import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema, BoardIdSchema } from '../schemas.js';

export const ListsSchema = new SimpleSchema([BaseSchema, BoardIdSchema, {
  title: {
    type: String
  }
}]);