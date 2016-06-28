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
