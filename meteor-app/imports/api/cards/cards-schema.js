import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema, ListIdSchema, BoardIdSchema, NameSchema } from '../schemas.js';

export const CardsSchema = new SimpleSchema([BaseSchema, ListIdSchema, BoardIdSchema, NameSchema]);