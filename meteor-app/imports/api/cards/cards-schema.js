import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema, ListIdSchema, BoardIdSchema } from '../schemas.js';

export const CardsSchema = new SimpleSchema([BaseSchema, ListIdSchema, BoardIdSchema, {
  title: {
    type: String
  }
}]);