import * as ActionTypes from './actionTypes'
import GregorianCalendar from 'gregorian-calendar';
import enUS from 'gregorian-calendar/lib/locale/en_US';
import moment from 'moment';

const timeSpendByDay = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TIME_BY_DAY:
      return Object.assign({}, state, { timeByDay: action.timeByDay });
    default:
      return state;
  }
};

export default timeSpendByDay;

export const getRange = (state) => {
  
  const startDate = new GregorianCalendar(enUS);
  startDate.setTime(moment().startOf('isoWeek'));
  
  const endDate = new GregorianCalendar(enUS);
  endDate.setTime(moment().endOf('isoWeek'));

  return {
    startDate,
    endDate
  };
};