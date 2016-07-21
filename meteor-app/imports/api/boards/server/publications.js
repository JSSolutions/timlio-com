import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Boards } from '../boards';

Meteor.publish('boards', function () {
  return Boards.find({});
});

Meteor.publish('accessedBoards', function () {
  const boards = Roles.getGroupsForUser(this.userId);
  return Boards.find({ _id: { $in: boards }});
});