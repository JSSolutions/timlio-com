import { Boards } from './boards';
import { createService } from '../helpers';
import * as Trello from '../trello';

const BoardsService = Object.assign(createService(Boards), {
  createIfNotExists(boardId) {
    if (!this.collection.findOne(boardId)) {
      const user = Meteor.user();
      const { token } = user.services.trello;
      
      const board = Trello.getBoard(boardId, token);

      return this.insert({
        _id: board.id,
        name: board.name
      });
    }
  }
});

export default BoardsService;