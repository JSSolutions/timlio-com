import { getUserTimeTrackStats } from '../../api/time-track-entries/methods';
import * as ActionTypes from './actionTypes';

export const receiveTimeByDay = (timeByDay) => ({
  type: ActionTypes.RECEIVE_TIME_BY_DAY,
  timeByDay
});

export const receiveTimeByBoard = (timeByBoard) => ({
  type: ActionTypes.RECEIVE_TIME_BY_BOARD,
  timeByBoard
});

export const receiveTimeByCard = (timeByCard) => ({
  type: ActionTypes.RECEIVE_TIME_BY_CARD,
  timeByCard
});

export const receiveTimeTrackStats = (timeTrackStats) => ({
  type: ActionTypes.RECEIVE_TIME_TRACK_STATS,
  timeTrackStats
});

export const requestTimeTrackStats = () => ({
  type: ActionTypes.REQUEST_TIME_TRACK_STATS
});

export const setUsers = (users) => ({
  type: ActionTypes.SET_USERS,
  users
});

export const setBoards = (boards) => ({
  type: ActionTypes.SET_BOARDS,
  boards
});

export const fetchTimeTrackStats = (startMoment, endMoment) => (dispatch, getState) => {
  dispatch(requestTimeTrackStats());

  const startDate = new Date(startMoment);
  const endDate = new Date(endMoment.endOf('day'));
  const { selectedUsers, selectedBoards } = getState();
  const userIds = _.pluck(selectedUsers, 'value');
  const boardIds = _.pluck(selectedBoards, 'value');
  const options = { startDate, endDate, userIds, boardIds };

  return getUserTimeTrackStats.callPromise(options).then((result) => {
    dispatch(receiveTimeTrackStats(result));
  });
};




