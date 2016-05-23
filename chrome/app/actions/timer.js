import * as ActionTypes from '../constants/ActionTypes';

export function toggleTimer({ payload }) {
  return (dispatch, getState) => {
    const state = getState();
    const { activeTimer } = state;
    let { timerId = null, card: activeCard = { id: '' } } = activeTimer;
    const card = payload;

    if (card.id !== activeCard.id || !timerId) {
      clearInterval(timerId);
      timerId = setInterval(() => {
        dispatch({ type: ActionTypes.UPDATE_TIMER })
      }, 1000);
    } else {
      clearInterval(timerId);
      timerId = null;
    }
    
    dispatch({ type: ActionTypes.TOGGLE_TIMER, timerId, card })
  }
}



