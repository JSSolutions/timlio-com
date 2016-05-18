import React, { Component } from 'react';

const logoUrl = chrome.extension.getURL('icons/icon.png');

export default class TimerButton extends Component {
  constructor() {
    super();

  }
  render() {
    return (
      <span className="icon-sm icon-edit list-card-operation dark-hover">
        <img src={logoUrl}/>
      </span>
    )
  }
}
