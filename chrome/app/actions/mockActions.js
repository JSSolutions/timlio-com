import * as ActionTypes from '../constants/ActionTypes';

export function dispatchToggleTimer(payload) {
  return {
    type: ActionTypes.DISPATCH_TOGGLE_TIMER,
    payload
  }
}