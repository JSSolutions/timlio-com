import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UserRoles } from '../constants.js';
import { BaseSchema } from '../schemas.js';
import { TrelloUserIdSchema, NameSchema } from '../schemas';

const UserRoleSchema = new SimpleSchema([TrelloUserIdSchema, {
  role: {
    type: String,
    allowedValues: _.values(UserRoles)
  }
}]);

export const BoardsSchema = new SimpleSchema([BaseSchema, NameSchema, {
  members: {
    type: [UserRoleSchema],
    minCount: 1,
    optional: true
  }
}]);
