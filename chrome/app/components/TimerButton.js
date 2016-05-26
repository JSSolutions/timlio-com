import React, { Component, PropTypes } from 'react';
import { toggleTimer } from '../actions/mockActions';
import { hrefReady } from '../util/helpers';

const logoUrl = chrome.extension.getURL('icons/icon.png');

export default class TimerButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const target = this.refs.timerIcon;
    target.addEventListener('click', this.onClick.bind(this), false);

    const $cardName = $(target).parents('.list-card').find('.js-card-name');
    
    hrefReady($cardName)
      .then(() => {
        this.cardId = $cardName.attr('href').split('/')[2];
      });
  }
  componentWillUnmount() {
    const target = this.refs.timerIcon;
    target.removeEventListener('click', this.onClick.bind(this), false);
  }
  onClick(e) {
    e.stopPropagation();
    const { dispatch } = this.props;
    const { cardId } = this;
    dispatch(toggleTimer({ cardId }));
  }
  render() {
    return (
      <span ref='timerIcon' className="icon-sm list-card-operation dark-hover timer-btn">
        <img src={logoUrl}/>
      </span>
    )
  }
}
