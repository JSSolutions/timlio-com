import { Mongo } from 'meteor/mongo';

import { ListsSchema } from './lists-schema.js';

const Lists = new Mongo.Collection('lists');
Lists.attachSchema(ListsSchema);

export { Lists };