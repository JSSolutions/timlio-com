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
    case ActionTypes.RECEIVE_TIME_BY_BOARD:
      return Object.assign({}, state, { timeByBoard: action.timeByBoard });
  }
};

export default timeSpendByDay;

export const getRange = (query) => ({
  startDate: query['start_date'] ? moment(query['start_date']) : moment().startOf('isoWeek'),
  endDate: query['end_date'] ? moment(query['end_date']) : moment().endOf('isoWeek').subtract(1, 'days')
});