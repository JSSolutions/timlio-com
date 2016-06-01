import store from '../../app/store/configureStore';
import { wrapStore } from 'react-chrome-redux';
import { trelloInit } from '../../app/util/trello';
import { APP_KEY } from '../../app/config';
import asteroid from '../../app/util/asteroid';
import { getCurrentUser } from '../../app/util/trello';

wrapStore(store, {
  portName: 'timlio'
});

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  // Now we have a token saved locally, as fetched from the settings page after authorization.
  if (request.command == 'saveToken') {
    localStorage.setItem('trello_token', request.token);
    trelloInit();
    const credentials = {
      trello: {
        appKey: APP_KEY,
        authToken: request.token,
        expirationTime: 1000
      }
    };
    asteroid.login(credentials, (err, result) => {
      if (!err) {
        console.log(result);
      } else {
        console.log(err)
      }
    });
    getCurrentUser()
      .then((user) => console.log(user));
    console.log(asteroid);
    sendResponse();
    return true;
  }
});
