import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BaseSchema = new SimpleSchema({
  createdBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return this.userId;
      } else {
        this.unset();
      }
    }
  },
  createdAt: {
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
  updatedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return this.userId;
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
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
});

const TrelloRegExId = /^[a-f\d]{24}$/i;

const trelloIdSchemaDoc = {
  type: String,
  regEx: TrelloRegExId
};

export const idSchemaDoc = {
  type: String,
  regEx: SimpleSchema.RegEx.Id
};

export const IdSchema = new SimpleSchema({
  _id: idSchemaDoc
});

export const TrelloIdSchema = new SimpleSchema({
  _id: trelloIdSchemaDoc
});

export const TrelloUserIdSchema = new SimpleSchema({
  userId: trelloIdSchemaDoc
});

export const CardIdSchema = new SimpleSchema({
  cardId: trelloIdSchemaDoc
});

export const UserIdSchema = new SimpleSchema({
  userId: idSchemaDoc
});

export const ListIdSchema = new SimpleSchema({
  listId: trelloIdSchemaDoc
});

export const BoardIdSchema = new SimpleSchema({
  boardId: trelloIdSchemaDoc
});

export const NameSchema = new SimpleSchema({
  name: {
    type: String
  }
});
