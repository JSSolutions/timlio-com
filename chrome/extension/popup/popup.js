import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import Timer from '../../app/containers/Timer';

const store = new Store({
  portName: 'timlio'
});

render(
  <Provider store={store}>
    <Timer/>
  </Provider>
, document.getElementById('timer'));