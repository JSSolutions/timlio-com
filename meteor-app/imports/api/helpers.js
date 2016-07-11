import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
 
export const createService = (collection) => ({
  collection,

  insert(doc) {
    return this.collection.insert(doc);
  },

  update(selector, updateDoc) {
    return this.collection.update(selector, { $set: updateDoc });
  },

  remove({ _id }) {
    return this.collection.remove({ _id });
  }
});

export const PromisifiedMethod = (options) => {
  return new ValidatedMethod(Object.assign(options, { mixins: [CallPromiseMixin] }))
};