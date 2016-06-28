import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { alias } from 'react-chrome-redux';
import rootReducer from '../reducers';
import aliases from '../actions/aliases';

export default createStore(rootReducer, applyMiddleware(alias(aliases), ThunkMiddleware));
