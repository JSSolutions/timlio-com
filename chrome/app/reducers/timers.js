import * as ActionTypes from '../constants/ActionTypes';

export function activeTimer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_TIMER:
      const { timerId, card } = action.payload;

      return { timerId, card };
    case ActionTypes.SET_TIME_TRACK:
      const { timeTrackId } = action.payload;
      
      return Object.assign({}, state, { timeTrackId });
    default:
      return state;
  }
}

export function timers(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_TIMER: {
      const { id: cardId } = action.payload.card;

      if (!state[cardId]) {
        state = Object.assign({}, state, {
          [cardId]: 0
        });
      }

      return state;
    }
    case ActionTypes.UPDATE_TIMER: {
      const { cardId } = action.payload;

      state[cardId]++;

      return Object.assign({}, state);
    }
    default:
      return state;
  }
}

export function getActiveCard({ activeTimer }) {
  return activeTimer.card;
}

export function getActiveTime({ activeTimer, timers }) {
  const { card = {} } = activeTimer;

  return timers[card.id];
}