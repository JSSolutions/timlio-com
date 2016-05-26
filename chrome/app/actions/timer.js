import * as ActionTypes from '../constants/ActionTypes';
import { getCard } from '../util/trello';

export function updateTimer(payload) {
  return {
    type: ActionTypes.UPDATE_TIMER,
    payload
  }
}

export function toggleTimer(payload) {
  return {
    type: ActionTypes.TOGGLE_TIMER,
    payload
  }
}

export function actionTimer({ payload }) {
  return (dispatch, getState) => {
    const { activeTimer } = getState();
    let { timerId = null, card: activeCard = { id: '' } } = activeTimer;
    const { cardId } = payload;

    clearInterval(timerId);
    
    getCard(cardId)
      .then((card) => {
        if (card.id !== activeCard.id || !timerId) {
          timerId = setInterval(() => dispatch(updateTimer({ cardId: card.id })), 1000);
        } else {
          timerId = null;
        }
        
        dispatch(toggleTimer({ timerId, card }));
      });
    
    return Promise.resolve({});
  }
}



