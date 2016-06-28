import { Mongo } from 'meteor/mongo';
import { TimeTrackEntriesSchema } from './time-track-entries-schema';

const TimeTrackEntries = new Mongo.Collection('timeTrackEntries');
TimeTrackEntries.attachSchema(TimeTrackEntriesSchema);

export { TimeTrackEntries };