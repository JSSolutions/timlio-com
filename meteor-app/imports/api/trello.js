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

const makeTrelloRequest = (request, token) => {
  return makeGetRequest(`${TrelloEndpoint}${request}`, token);
};

export const getBoard = (boardId, token) => {
  return makeTrelloRequest(`boards/${boardId}`, token);
};

export const getBoardMemberships = (boardId, token) => {
  return makeTrelloRequest(`boards/${boardId}/memberships`, token);
};

export const getList = (listId, token) => {
  return makeTrelloRequest(`lists/${listId}`, token);
};

export const getCard = (cardId, token) => {
  return makeTrelloRequest(`cards/${cardId}`, token);
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