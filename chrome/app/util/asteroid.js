import { createClass } from 'asteroid';
import { APP_KEY } from '../config';

const Asteroid = createClass();

const asteroid = new Asteroid({
  endpoint: 'ws://localhost:2000/websocket'
});

asteroid.ddp.on('added', ({collection, id, fields}) => {
  console.log(`Element added to collection ${collection}`);
  console.log(id);
  console.log(fields);
});

export const loginWithTrello = () => {
  const params = {
    trello: {
      appKey: APP_KEY,
      authToken: localStorage.getItem('trello_token'),
      expirationTime: 1000
    }
  };
  
  return asteroid.login(params);
};

export const isLoggedIn = () => {
  return asteroid.loggedIn;
};

export const startTimer = ({ id: cardId, name, idBoard: boardId, idList: listId }) => {
  return asteroid.call('TimeTrackEntries.insert', { cardId, name, boardId, listId });
};

export const stopTimer = (_id) => {
  return asteroid.call('TimeTrackEntries.update', { _id });
};
