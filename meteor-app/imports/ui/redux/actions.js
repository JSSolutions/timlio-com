import { getUserBoardsTime, getUserTimeByDay } from '../../api/time-track-entries/methods';
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

export const setUsers = (users) => ({
  type: ActionTypes.SET_USERS,
  users
});

export const setBoards = (boards) => ({
  type: ActionTypes.SET_BOARDS,
  boards
});

export const fetchTime = (startMoment, endMoment) => (dispatch, getState) => {
  const startDate = new Date(startMoment);
  const endDate = new Date(endMoment.endOf('day'));
  const { selectedUsers, selectedBoards } = getState();
  const userIds = _.pluck(selectedUsers, 'value');
  const boardIds = _.pluck(selectedBoards, 'value');
  const options = { startDate, endDate, userIds, boardIds };

  return Promise.all([
    getUserTimeByDay.callPromise(options),
    getUserBoardsTime.callPromise(options)
  ]).then((result) => {
    dispatch(receiveTimeByDay(result[0]));
    dispatch(receiveTimeByBoard(result[1]));
  });
};




