import * as ActionTypes from '../constants/ActionTypes';

export function dispatchToggleTimer(payload) {
  return {
    type: ActionTypes.DISPATCH_TOGGLE_TIMER,
    payload
  }
}

export function dispatchGetCard(payload) {
  return {
    type: ActionTypes.DISPATCH_GET_CARD,
    payload
  }
}