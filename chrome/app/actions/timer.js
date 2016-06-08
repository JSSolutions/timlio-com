import * as ActionTypes from '../constants/ActionTypes';
import { getCard } from '../util/trello';
import * as Asteroid from '../util/asteroid';

export function updateTimer(payload) {
  return {
    type: ActionTypes.UPDATE_TIMER,
    payload
  }
}

export function setTimer(payload) {
  return {
    type: ActionTypes.SET_TIMER,
    payload
  }
}

export function setTimeTrack(payload) {
  return {
    type: ActionTypes.SET_TIME_TRACK,
    payload
  }
}

function stopTimerIfRunning({ timeTrackId, timerId }) {
  if (timeTrackId) {
    clearInterval(timerId);
    
    Asteroid.stopTimer(timeTrackId)
      .then(() => console.log('Stop timer Success'))
      .catch((err) => console.log(`Error ${err.message}`));
  }
}

const toggleTimer = (receivedCard, activeTimer) => (dispatch) => {
  let { timerId = null, card: activeCard = { id: '' } } = activeTimer;
  let p = null;

  if (receivedCard.id !== activeCard.id || !timerId) {
    timerId = setInterval(() => dispatch(updateTimer({ cardId: receivedCard.id })), 1000);

    p = Asteroid.startTimer(receivedCard);
  } else {
    timerId = null;
  }

  dispatch(setTimer({ timerId, card: receivedCard }));
  return p;
};

export const actionTimer = ({ payload }) => (dispatch, getState) => {
  const { activeTimer } = getState();
  const { cardId } = payload;

  stopTimerIfRunning(activeTimer);

  return Promise.resolve(
    getCard(cardId)
      .then((receivedCard) => dispatch(toggleTimer(receivedCard, activeTimer)))
      .then((timeTrackId) => dispatch(setTimeTrack({ timeTrackId })))
      .catch((err) => console.log(`Error ${err.message}`, err))
  );
};



