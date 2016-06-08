import { Cards } from './cards';
import { createService } from '../helpers';

const CardsService = Object.assign(createService(Cards), {
  createIfNotExists(doc) {
    if (!this.collection.findOne(doc.cardId)) {
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