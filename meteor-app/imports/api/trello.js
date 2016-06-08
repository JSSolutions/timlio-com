import { HTTP } from 'meteor/http';
import { TrelloEndpoint } from './constants';

const makeGetRequest = (request, token) => {
  const key = Meteor.settings.trello.appKey;
  let result;
  result = HTTP.get(request, {
    params: {
      key,
      token
    }
  });

  return result.data;
};

export const getBoard = (boardId, token) => {
  return makeGetRequest(`${TrelloEndpoint}boards/${boardId}`, token);
};

export const getList = (listId, token) => {
  return makeGetRequest(`${TrelloEndpoint}lists/${listId}`, token);
};

export const getCard = (cardId, token) => {
  return makeGetRequest(`${TrelloEndpoint}cards/${cardId}`, token);
};