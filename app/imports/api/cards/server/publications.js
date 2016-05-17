import { Meteor } from 'meteor/meteor';

import { Cards } from '../cards.js';

Meteor.publish('cards', function () {
  return Cards.find({});
});