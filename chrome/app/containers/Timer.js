import { connect } from 'react-redux';
import Timer from '../components/Timer';

const mapStateToProps = (state) => {
  const { activeTimer, timers } = state;
  const { card = null } = activeTimer;

  return {
    card: activeTimer.card,
    time: card ? timers[card.id] : 0
  }
};


export default connect(mapStateToProps)(Timer);