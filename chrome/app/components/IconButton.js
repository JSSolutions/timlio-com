import React, { Component, PropTypes } from 'react';
import { hrefReady } from '../util/helpers';
import { LOGO_URL } from '../config';

export default class IconButton extends Component {
  static propTypes = {
    toggleTimer: PropTypes.func.isRequired
  };
  componentDidMount() {
    const target = this.refs.iconButton;
    $(target).click(this.onClick.bind(this));

    const $cardName = $(target).parents('.list-card').find('.js-card-name');

    hrefReady($cardName)
      .then(() => {
        this.cardId = $cardName.attr('href').split('/')[2];
      });
  }
  onClick(e) {
    e.stopPropagation();
    const { toggleTimer } = this.props;
    toggleTimer(this.cardId);
  }
  render() {
    return (
      <span ref="iconButton" className="icon-sm list-card-operation dark-hover timer-btn">
        <img src={LOGO_URL}/>
      </span>
    )
  }
}
