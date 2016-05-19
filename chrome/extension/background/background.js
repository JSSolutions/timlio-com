import store from '../../app/store/configureStore';
import { wrapStore } from 'react-chrome-redux';

wrapStore(store, {
  portName: 'timlio',
  dispatchResponder(dispatchResult, send) {
    send({
      error: null,
      value: {}
    })
  }
});