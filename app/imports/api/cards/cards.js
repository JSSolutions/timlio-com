import { Mongo } from 'meteor/mongo';

import { CardsSchema } from './cards-schema.js';

const Cards = new Mongo.Collection('cards');
Cards.attachSchema(CardsSchema);

export { Cards };