import { trelloInit } from '../util/trello';

trelloInit();

export function getCard({ payload }) {
  return (dispatch) => {
    const { cardId, dispatchCb } = payload;
    Trello.rest('GET', `cards/${cardId}`, {}, (data) => {
      dispatch(dispatchCb(data));
    });
  }
}