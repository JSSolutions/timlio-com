import * as ActionTypes from './actionTypes'

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
