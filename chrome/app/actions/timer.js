import * as ActionTypes from '../constants/ActionTypes';

export function toggleTimer({ payload }) {
  return (dispatch, getState) => {
    const state = getState();
    const { activeTimer } = state;
    let { timerId = null, card: activeCard = { id: '' } } = activeTimer;
    const card = payload;
    
    clearInterval(timerId);
    
    if (card.id !== activeCard.id) {
      timerId = setInterval(() => {
        dispatch({type: ActionTypes.UPDATE_TIMER})
      }, 1000);
    }
    
    dispatch({ type: ActionTypes.TOGGLE_TIMER, timerId, card })
  }
}



