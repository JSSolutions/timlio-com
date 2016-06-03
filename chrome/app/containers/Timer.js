import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { digitize, getHours, getMinutes, getSeconds } from '../util/time';
import { getActiveTime, getActiveCard } from '../reducers/timers';

class Timer extends Component {
  static propTypes = {
    card: PropTypes.object,
    time: PropTypes.number
  };
  renderTime() {
    const { time = 0, card = { name: '' } } = this.props;
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

const mapStateToProps = (state) => {
  return {
    card: getActiveCard(state),
    time: getActiveTime(state)
  }
};

export default connect(mapStateToProps)(Timer);