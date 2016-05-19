import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  timerId: null,
  seconds: 0,
  minutes: 0,
  hours: 0
};

function updateTime(time) {
  time.seconds++;
  if (time.seconds === 60) {
    time.minutes++;
    time.seconds = 0;

    if (time.minutes === 60) {
      time.hours++;
      time.minutes = 0;
    }
  }

  return time
}

export default function timer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TIMER:
      return Object.assign({}, state, {
        timerId: action.payload
      });
    case ActionTypes.UPDATE_TIMER:
      return Object.assign({}, updateTime(state));
    default:
      return state;
  }
}