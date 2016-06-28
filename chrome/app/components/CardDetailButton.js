import React, { Component, PropTypes } from 'react';
import { LOGO_URL } from '../config';

export default class CardDetailButton extends Component {
  static propTypes = {
    actionTimer: PropTypes.func.isRequired
  };
  componentDidMount() {
    const target = this.refs.cardDetailButton;
    $(target).click(this.onClick.bind(this));

    this.cardId = location.pathname.split('/')[2];
  }
  onClick(e) {
    e.preventDefault();
    const { actionTimer } = this.props;
    actionTimer(this.cardId);
  }
  render() {
    return (
      <a ref="cardDetailButton" className="button-link" href="#">
        <span className="icon-sm"><img src={LOGO_URL}/></span> 
        <span className="btn-text">Start Timer</span>
      </a>
    )
  }
}