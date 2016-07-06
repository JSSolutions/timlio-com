import { Meteor } from 'meteor/meteor';
import { TimeTrackEntries } from '../time-track-entries';

Meteor.publish('timeTrackEntries', function () {
  return TimeTrackEntries.find({});
});