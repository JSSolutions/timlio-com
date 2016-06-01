import { APP_KEY } from '../../app/config';
import '../../app/lib/trello-client';

Trello.setKey(APP_KEY);

export const trelloInit = () => {
  Trello.setToken(localStorage.getItem('trello_token'));
};

export const trelloAuth = () => {
  Trello.authorize( {
    name: 'Timlio',
    type: 'popup',
    expiration: 'never',
    interactive: true,
    scope: { read: true, write: false },
    success() {
      chrome.extension.sendMessage({
        command: 'saveToken',
        token: localStorage.getItem('trello_token')
      });
    },
    error() {
      console.log('error');
    }
  });
};

export function getCard(cardId) {
  return new Promise((resolve) => {
    Trello.rest('GET', `cards/${cardId}`, {}, (data) => {
      resolve(data);
    });
  });
}

export function getCurrentUser() {
  return new Promise((resolve) => {
    Trello.rest('GET', 'members/me', {}, (data) => {
      resolve(data)
    });
  });
}
