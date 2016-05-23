import * as ActionTypes from '../constants/ActionTypes';
import { toggleTimer } from './timer';
import { getCard } from './trello';

export default {
  [ActionTypes.DISPATCH_TOGGLE_TIMER] : toggleTimer,
  [ActionTypes.DISPATCH_GET_CARD]: getCard
}