import * as ActionTypes from '../constants/ActionTypes';
import { getCard } from '../util/trello';
import * as Asteroid from '../util/asteroid';

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

export function setTimeTrack(payload) {
  return {
    type: ActionTypes.SET_TIME_TRACK,
    payload
  }
}

export function actionTimer({ payload }) {
  return (dispatch, getState) => {
    const { activeTimer } = getState();
    let { timerId = null, card: activeCard = { id: '' }, timeTrackId } = activeTimer;
    const { cardId } = payload;

    if (activeCard.id && timeTrackId) {
      clearInterval(timerId);

      Asteroid.stopTimer(timeTrackId)
        .then(() => console.log('Timer Success'))
        .catch((err) => console.log(`Error ${err.message}`));
    }
    
    getCard(cardId)
      .then((card) => {
        let p = null;
        if (card.id !== activeCard.id || !timerId) {
          timerId = setInterval(() => dispatch(updateTimer({ cardId: card.id })), 1000);
          p = Asteroid.startTimer(card.id);
        } else {
          timerId = null;
        }
        
        dispatch(toggleTimer({ timerId, card }));
        return p;
      })
      .then((timeTrackId) => dispatch(setTimeTrack({ timeTrackId })))
      .catch((err) => console.log(`Error ${err.message}`));
    
    return Promise.resolve({});
  }
}



