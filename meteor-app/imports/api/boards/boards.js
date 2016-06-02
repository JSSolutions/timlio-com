import { Mongo } from 'meteor/mongo';
import { BoardsSchema } from './boards-schema.js';

const Boards = new Mongo.Collection('boards');
Boards.attachSchema(BoardsSchema);

export { Boards };