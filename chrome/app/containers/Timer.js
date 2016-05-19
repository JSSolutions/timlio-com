import { connect } from 'react-redux';
import Timer from '../components/Timer';

const mapStateToProps = (state) => {
  return {
    timer: state.timer
  }
};


export default connect(mapStateToProps)(Timer);