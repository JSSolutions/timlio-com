import React from 'react';
import { render } from 'react-dom';
import Root from './root';
import configureStore from '../../ui/redux/configureStore';

const store = configureStore();

render(<Root store={store}/>, document.getElementById('app'));