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

export const fetchTimeByDay = (startDate, endDate, userId) => (dispatch) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  getUserTimeByDay.call({ startDate, endDate, userId }, (err, result) => {
    if (err) {
      console.log(err);
    }

    dispatch(receiveTimeByDay(result));
  });
};

export const fetchTimeByBoard = (userId) => (dispatch) => {
  getUserBoardsTime.call({ userId: Meteor.userId() }, (err, result) => {
    if (err) {
      console.log(err);
    }
    
    dispatch(receiveTimeByBoard(result));
  });
};
