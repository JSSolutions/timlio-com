import store from '../../app/store/configureStore';
import { wrapStore } from 'react-chrome-redux';

wrapStore(store, {
  portName: 'timlio'
});

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  // Now we have a token saved locally, as fetched from the settings page after authorization.
  if (request.command == 'saveToken') {
    console.log(request.token);
    localStorage.setItem('trello_token', request.token);
    sendResponse();
    return true;
  }
});