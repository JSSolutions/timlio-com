import * as ActionTypes from '../constants/ActionTypes';

export function actionTimer(payload) {
  return {
    type: ActionTypes.ACTION_TIMER,
    payload
  }
}