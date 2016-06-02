import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UserIdSchema, CardIdSchema } from '../schemas';

export const TimeTrackEntriesSchema = new SimpleSchema([UserIdSchema, CardIdSchema, {
  startDate: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    }
  },
  stopDate: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      } else {
        this.unset();
      }
    }
  }
}]);