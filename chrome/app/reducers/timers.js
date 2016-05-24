import * as ActionTypes from '../constants/ActionTypes';

export function activeTimer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TIMER:
      const { timerId, card } = action.payload;

      return { timerId, card };
    default:
      return state;
  }
}

export function timers(state = {}, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TIMER: {
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