import { Meteor } from 'meteor/meteor';
import { Boards } from '../boards.js';

Meteor.publish('boards', function () {
  return Boards.find({});
});