import { TimeTrackEntries } from '../time-track-entries/time-track-entries';

export default TimeTrackEntryService = {

  collection: TimeTrackEntries,

  insert(doc) {
    return this.collection.insert(doc);
  },

  update(_id) {
    return this.collection.update(_id, {});
  },

  remove({ _id }) {
    return this.collection.remove({ _id });
  }
};