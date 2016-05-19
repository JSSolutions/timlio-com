import React, { Component, PropTypes } from 'react';
import { dispatchToggleTimer } from '../actions/mockActions';
import './TimerButton.css';


const logoUrl = chrome.extension.getURL('icons/icon.png');

export default class TimerButton extends Component {
  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired
  // };

  componentDidMount() {
    const target = this.refs.timerIcon;
    target.addEventListener('click', this.onClick.bind(this), false);
  }
  componentWillUnmount() {
    const target = this.refs.timerIcon;
    target.removeEventListener('click', this.onClick.bind(this), false);
  }
  onClick(e) {
    e.stopPropagation();
    const { dispatch } = this.props;
    dispatch(dispatchToggleTimer());
  }
  render() {
    return (
      <span ref='timerIcon' className="icon-sm list-card-operation dark-hover timer-btn">
        <img src={logoUrl}/>
      </span>
    )
  }
}
