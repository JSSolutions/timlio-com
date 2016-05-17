import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UserRoles } from '../constants.js';
import { BaseSchema } from '../schemas.js';

const userRoleSchema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  role: {
    type: String,
    allowedValues: _.values(UserRoles)
  }
});

export const BoardsSchema = new SimpleSchema([BaseSchema, {
  title: {
    type: String
  },
  users: {
    type: [userRoleSchema],
    minCount: 1
  }
}]);
