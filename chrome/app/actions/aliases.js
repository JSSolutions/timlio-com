import * as ActionTypes from '../constants/ActionTypes';
import { toggleTimer } from './timer';

export default {
  [ActionTypes.DISPATCH_TOGGLE_TIMER] : toggleTimer
}