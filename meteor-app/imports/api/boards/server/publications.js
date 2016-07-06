import { Meteor } from 'meteor/meteor';
import { Boards } from '../boards';

Meteor.publish('boards', function () {
  return Boards.find({});
});