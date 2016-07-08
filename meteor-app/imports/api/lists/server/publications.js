import { Meteor } from 'meteor/meteor';
import { Lists } from '../lists';

Meteor.publish('lists', function () {
  return Lists.find({});
});