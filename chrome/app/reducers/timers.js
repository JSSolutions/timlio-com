import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  activeTimer: {},
  timers: {}
};

/*
  activeTimer: {
    card: {},
    timerId: '',
  },
  timers: {
    id1: 0,
    id2: 10
  }
 */

function timer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TIMER:
      const { timerId, card } = action.payload;

      return Object.assign({}, state, {
        timerId,
        card
      });
    case ActionTypes.UPDATE_TIMER:
    default:
      return state;
  }
}


export default function timers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TIMER: {
      const { id: cardId } = action.payload.card;
      let { timers, activeTimer } = state;

      if (!timers[cardId]) {
        timers = Object.assign({}, timers, {
          [cardId]: 0
        });
      }

      return Object.assign({}, { timers, activeTimer: timer(activeTimer, action) });
    }
    case ActionTypes.UPDATE_TIMER: {
      const { timers } = state;
      const { cardId } = action.payload;
      
      timers[cardId]++;

      return Object.assign({}, state, { timers });
    }
    default:
      return state;
  }
}