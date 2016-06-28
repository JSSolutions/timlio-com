import { HTTP } from 'meteor/http';
import { TrelloEndpoint } from './constants';

const makeGetRequest = (request, token) => {
  const key = Meteor.settings.trello.appKey;
  const result = HTTP.get(request, {
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

export const setupWebhook = (modelId, token) => {
  const { appKey: key, callbackURL } = Meteor.settings.trello;

  const result = HTTP.post(`${TrelloEndpoint}tokens/${token}/webhooks`, {
    params: {
      key
    },
    data: {
      callbackURL,
      idModel: modelId
    }
  });

  return result.data;
};