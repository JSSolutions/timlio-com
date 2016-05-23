import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { digitize, getHours, getMinutes, getSeconds } from '../util/time';

export default class Timer extends Component {
  static propTypes = {
    card: PropTypes.object,
    time: PropTypes.number
  };
  renderTime() {
    const { time, card = { name: '' } } = this.props;
    const minutes = getMinutes(time);
    const hours = getHours(time);
    const seconds = getSeconds(time);
    return(
      <span>{card.name} {digitize(hours)}:{digitize(minutes)}:{digitize(seconds)}</span>
    )
  }
  render() {
    return (
      <div className={classnames({ 'header-timer': true })}>
        {this.renderTime()}
      </div>
    )
  }
}