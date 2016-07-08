import { Meteor } from 'meteor/meteor';
import { Cards } from '../cards';

Meteor.publish('cards', function () {
  return Cards.find({});
});