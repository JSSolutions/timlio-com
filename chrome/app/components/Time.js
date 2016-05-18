import React, { Component } from 'react';
import classnames from 'classnames';

import './Time.css';

export  default class Time extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0
    };
    
    this.interval = setInterval(() => {
      this.setState(this.updateTime(this.state))
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  updateTime(time) {
    time.seconds++;
    if (time.seconds === 60) {
      time.minutes++;
      time.seconds = 0;
      
      if (time.minutes === 60) {
        time.hours++;
        time.minutes = 0;
      }
    } 
    const { seconds, minutes, hours } = time;
    
    return {
      seconds,
      minutes,
      hours
    }
  }
  digitize(value) {
    value = value.toString();

    if(value.length == 1) {
      value = `0${value}`;
    }
    return value;
  }
  renderTime() {
    const { seconds, minutes, hours } = this.state;
    return(
      <span>{this.digitize(hours)}:{this.digitize(minutes)}:{this.digitize(seconds)}</span>
    )
  }
  render() {
    return (
      <div className={classnames({ 'header-time': true })}>
        <span>{this.renderTime()}</span>
      </div>
    )
  }
}