import * as ActionTypes from '../constants/ActionTypes';

export function toggleTimer() {
  return (dispatch, getState) => {
    let { timerId } = getState().timer;
    if (timerId === null) {
      timerId = setInterval(() => {
        dispatch({ type: ActionTypes.UPDATE_TIMER, payload: {} })
      }, 1000);
    } else {
      clearInterval(timerId);
      timerId = null;
    }
    dispatch({ type: ActionTypes.TOGGLE_TIMER, payload: timerId })
  }
}



