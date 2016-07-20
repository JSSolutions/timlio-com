import * as ActionTypes from './actionTypes';
import { combineReducers } from 'redux';

const timeTrackStats = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TIME_BY_DAY:
      return Object.assign({}, state, { timeByDay: action.timeByDay });
    case ActionTypes.RECEIVE_TIME_BY_BOARD:
      return Object.assign({}, state, { timeByBoard: action.timeByBoard });
    case ActionTypes.REQUEST_TIME_TRACK_STATS:
      return Object.assign({}, state, { isFetching: true });
    case ActionTypes.RECEIVE_TIME_TRACK_STATS:
      const { timeByDay, timeByBoard } = action.timeTrackStats;
      return Object.assign({}, state, { timeByDay, timeByBoard, isFetching: false });
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

const selectedBoards = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_BOARDS:
      return action.boards;
    default:
      return state;
  }
};

export default combineReducers({
  timeTrackStats,
  selectedUsers,
  selectedBoards
});
