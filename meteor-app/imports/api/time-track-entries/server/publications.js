import { Meteor } from 'meteor/meteor';
import { TimeTrackEntries } from '../time-track-entries.js';

Meteor.publish('timeTrackEntries', function () {
  return TimeTrackEntries.find({});
});