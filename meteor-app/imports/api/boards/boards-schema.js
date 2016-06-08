import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UserRoles } from '../constants.js';
import { BaseSchema } from '../schemas.js';
import { UserIdSchema, NameSchema } from '../schemas';

const userRoleSchema = new SimpleSchema([UserIdSchema, {
  role: {
    type: String,
    allowedValues: _.values(UserRoles)
  }
}]);

export const BoardsSchema = new SimpleSchema([BaseSchema, NameSchema, {
  users: {
    type: [userRoleSchema],
    minCount: 1,
    optional: true
  }
}]);
