import { createClass } from 'asteroid';
import { APP_KEY } from '../config';

const Asteroid = createClass();
// Connect to a Meteor backend
const asteroid = new Asteroid({
  endpoint: 'ws://localhost:3000/websocket'
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