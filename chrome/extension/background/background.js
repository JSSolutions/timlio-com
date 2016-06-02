import store from '../../app/store/configureStore';
import { wrapStore } from 'react-chrome-redux';
import { trelloInit } from '../../app/util/trello';
import { loginWithTrello } from '../../app/util/asteroid';

wrapStore(store, {
  portName: 'timlio'
});

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  // Now we have a token saved locally, as fetched from the settings page after authorization.
  if (request.command == 'saveToken') {
    localStorage.setItem('trello_token', request.token);
    
    trelloInit();
    
    loginWithTrello()
      .then((res) => console.log('loginWithTrello Success'))
      .catch((err) => console.log(`loginWithTrello Error ${err.message}`));
    
    sendResponse();
    return true;
  }
});
