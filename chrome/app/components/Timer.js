import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const digitize = (value) => {
  let str = value.toString();

  if(str.length == 1) {
    str = `0${str}`;
  }
  return str;
};

export default class Timer extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired
  };
  renderTime() {
    const { timer = {} } = this.props;
    const { seconds = 0, minutes = 0, hours = 0 } = timer;
    return(
      <span>{digitize(hours)}:{digitize(minutes)}:{digitize(seconds)}</span>
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