import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { UserRoles } from '../../constants';

Meteor.publish('users', function () {
  return Meteor.users.find({});
});

Meteor.publish('accessedUsers', function () {
  const boards = Roles.getGroupsForUser(this.userId, UserRoles.ADMIN);
  const query = boards.reduce((query, board) => {
    query[`roles.${board}`] = { $exists: true };
    return query;
  }, {});

  query['profile'] = { $exists: true };

  return Meteor.users.find(query);
});