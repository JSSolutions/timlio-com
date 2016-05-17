import { Meteor } from 'meteor/meteor';

import { Lists } from '../lists.js';
import React from 'react';

Meteor.publish('lists', function () {
  return Lists.find({});
});