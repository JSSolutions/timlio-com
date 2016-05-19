import * as ActionTypes from '../constants/ActionTypes';

export function dispatchToggleTimer() {
  return {
    type: ActionTypes.DISPATCH_TOGGLE_TIMER,
    payload: {}
  }
}