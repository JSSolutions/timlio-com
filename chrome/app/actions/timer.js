import * as ActionTypes from '../constants/ActionTypes';

export function toggleTimer({ payload }) {
  return (dispatch, getState) => {
    const state = getState();
    const { activeTimer } = state;
    let { timerId = null, card: activeCard = { id: '' } } = activeTimer;
    const card = payload;

    clearInterval(timerId);
    
    if (card.id !== activeCard.id || !timerId) {
      timerId = setInterval(() => {
        dispatch({ type: ActionTypes.UPDATE_TIMER })
      }, 1000);
    } else {
      timerId = null;
    }
    
    dispatch({ type: ActionTypes.TOGGLE_TIMER, timerId, card })
  }
}



