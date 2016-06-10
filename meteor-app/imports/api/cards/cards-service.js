import { Cards } from './cards';
import { createService } from '../helpers';
import * as Trello from '../trello';

const CardsService = Object.assign(createService(Cards), {
  createIfNotExists(doc) {
    if (!this.collection.findOne(doc.cardId)) {
      const user = Meteor.user();
      const { token } = user.services.trello;
      
      Trello.setupWebhook(doc.cardId, token);
      
      this.insert({
        _id: doc.cardId,
        boardId: doc.boardId,
        listId: doc.listId,
        name: doc.name
      });
    }
  }
});

export default CardsService;