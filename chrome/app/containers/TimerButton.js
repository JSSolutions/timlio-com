import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleTimer } from '../actions/mockActions';
import IconButton from '../components/IconButton';
import CardDetailButton from '../components/CardDetailButton';
import * as ButtonTypes from '../constants/ButtonTypes';

class TimerButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  toggleTimer(cardId) {
    const { dispatch } = this.props;
    dispatch(toggleTimer({ cardId }));
  }
  render() {
    const { type } = this.props;
    if (type === ButtonTypes.ICON) {
      return (
        <IconButton toggleTimer={this.toggleTimer.bind(this)}/>
      )
    } else if (type === ButtonTypes.CARD_DETAIL) {
      return (
        <CardDetailButton toggleTimer={this.toggleTimer.bind(this)}/>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    type: ownProps.type 
  }
};

export default connect(mapStateToProps)(TimerButton);

