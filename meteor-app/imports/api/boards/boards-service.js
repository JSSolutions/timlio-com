import { Roles } from 'meteor/alanning:roles';
import { Boards } from './boards';
import { createService } from '../helpers';
import * as Trello from '../trello';

const BoardsService = Object.assign(createService(Boards), {
  createIfNotExists(boardId) {
    if (!this.collection.findOne(boardId)) {
      const user = Meteor.user();
      const { token } = user.services.trello;
      
      const board = Trello.getBoard(boardId, token);
      const roles = Trello.getBoardMemberships(boardId, token);
      roles.forEach((role) => {
        const { insertedId } = Meteor.users.upsert({ 'services.trello.id': role.idMember }, {
          $set: {
            'services.trello.id': role.idMember
          }
        });

        if (insertedId) {
          Roles.addUsersToRoles(insertedId, role.memberType, boardId);
        }
      });

      
      return this.insert({
        _id: board.id,
        name: board.name
      });
    }
  }
});

export default BoardsService;