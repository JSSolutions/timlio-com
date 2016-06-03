import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actionTimer } from '../actions/mockActions';
import IconButton from '../components/IconButton';
import CardDetailButton from '../components/CardDetailButton';
import * as ButtonTypes from '../constants/ButtonTypes';

class TimerButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  actionTimer(cardId) {
    const { dispatch } = this.props;
    dispatch(actionTimer({ cardId }));
  }
  render() {
    const { type } = this.props;
    if (type === ButtonTypes.ICON) {
      return (
        <IconButton actionTimer={this.actionTimer.bind(this)}/>
      )
    } else if (type === ButtonTypes.CARD_DETAIL) {
      return (
        <CardDetailButton actionTimer={this.actionTimer.bind(this)}/>
      )
    }
  }
}

const mapStateToProps = (state, { type }) => {
  return { 
    type
  }
};

export default connect(mapStateToProps)(TimerButton);

