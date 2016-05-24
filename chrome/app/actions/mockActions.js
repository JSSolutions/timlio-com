import * as ActionTypes from '../constants/ActionTypes';

export function toggleTimer(payload) {
  return {
    type: ActionTypes.ACTION_TIMER,
    payload
  }
}