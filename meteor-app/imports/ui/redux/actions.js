import { getUserBoardsTime, getUserTimeByDay } from '../../api/time-track-entries/methods';
import * as ActionTypes from './actionTypes';

export const receiveTimeByDay = (timeByDay) => ({
  type: ActionTypes.RECEIVE_TIME_BY_DAY,
  timeByDay
});

export const changeDate = (field, value) => ({
  type: ActionTypes.CHANGE_DATE,
  field,
  value
});

export const fetchTimeByDay = (startDate, endDate, userId) => (dispatch) => {
  startDate = new Date(startDate.getTime());
  endDate = new Date(endDate.getTime());
  
  getUserTimeByDay.call({ startDate, endDate, userId }, (err, result) => {
    if (err) {
      console.log(err);
    }
    
    dispatch(receiveTimeByDay(result));
  });
};
