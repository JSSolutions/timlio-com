import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UserRoles } from '../constants.js';
import { BaseSchema } from '../schemas.js';
import { UserIdSchema } from '../schemas';

const userRoleSchema = new SimpleSchema([UserIdSchema, {
  role: {
    type: String,
    allowedValues: _.values(UserRoles)
  }
}]);

export const BoardsSchema = new SimpleSchema([BaseSchema, {
  title: {
    type: String
  },
  users: {
    type: [userRoleSchema],
    minCount: 1
  }
}]);
