import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Timer.css';

export default class Timer extends Component {
  // static propTypes = {
  //   timer: PropTypes.object.isRequired
  // };
  
  digitize(value) {
    value = value.toString();

    if(value.length == 1) {
      value = `0${value}`;
    }
    return value;
  }
  renderTime() {
    const { timer = {} } = this.props;
    const { seconds = 0, minutes = 0, hours = 0 } = timer;
    return(
      <span>{this.digitize(hours)}:{this.digitize(minutes)}:{this.digitize(seconds)}</span>
    )
  }
  render() {
    return (
      <div className={classnames({ 'header-timer': true })}>
        <span>{this.renderTime()}</span>
      </div>
    )
  }
}