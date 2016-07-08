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

export const fetchTimeByDay = (startMoment, endMoment) => (dispatch, getState) => {
  const startDate = new Date(startMoment);
  const endDate = new Date(endMoment);
  const { selectedUsers, selectedBoards } = getState();
  const userIds = _.pluck(selectedUsers, 'value');
  const boardIds = _.pluck(selectedBoards, 'value');
  
  return getUserTimeByDay.callPromise({ startDate, endDate, userIds, boardIds })
    .then((result) => dispatch(receiveTimeByDay(result)));
};

export const fetchTimeByBoard = (userId) => (dispatch) =>
  getUserBoardsTime.callPromise({ userId: Meteor.userId() })
    .then((result) => dispatch(receiveTimeByBoard(result)));

