import { activeTimer, timers } from './timers';
import { combineReducers } from 'redux';

export default combineReducers({
  activeTimer,
  timers
});