import { Lists } from './lists';
import { createService } from '../helpers';
import * as Trello from '../trello';

const ListsService = Object.assign(createService(Lists), {
  createIfNotExists(listId) {
    if (!this.collection.findOne(listId)) {
      const user = Meteor.user();
      const {token} = user.services.trello;
      const list = Trello.getList(listId, token);

      return this.insert({
        _id: list.id,
        boardId: list.idBoard,
        name: list.name
      });
    }
  }
});

export default ListsService;
