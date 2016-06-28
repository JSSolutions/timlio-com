import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema, BoardIdSchema, NameSchema } from '../schemas.js';

export const ListsSchema = new SimpleSchema([BaseSchema, BoardIdSchema, NameSchema]);