import * as ActionTypes from './actionTypes';
import { combineReducers } from 'redux';

const timeSpend = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TIME_BY_DAY:
      return Object.assign({}, state, { timeByDay: action.timeByDay });
    case ActionTypes.RECEIVE_TIME_BY_BOARD:
      return Object.assign({}, state, { timeByBoard: action.timeByBoard });
    default:
      return state;
  }
};

const selectedUsers = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_USERS:
      return action.users;
    default: 
      return state;
  }
};


export default combineReducers({
  timeSpend,
  selectedUsers
});
