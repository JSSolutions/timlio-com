import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filters from '../components/Filters';
import TimeTrackStats from '../components/TimeTrackStats';
import { fetchTimeTrackStats } from '../redux/actions';
import { getInterval } from '../helpers';

class Home extends Component {
  render() {
    const { fetchTime, startDate, endDate } = this.props;

    return (
      <div>
        <Filters
          startDate={startDate}
          endDate={endDate}
          fetchTime={fetchTime}/>
        <TimeTrackStats
          {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = ({ timeTrackStats, isFetching }, { location }) => {
  const { startDate, endDate } = getInterval(location.query);

  return {
    timeByDay: timeTrackStats.timeByDay,
    timeByBoard: timeTrackStats.timeByBoard,
    startDate,
    endDate,
    isFetching
  }
};

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    fetchTime(startDate, endDate) {
      if (!startDate && !endDate) {
        ({ startDate, endDate } = getInterval(location.query));
      }

      dispatch(fetchTimeTrackStats(startDate, endDate));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);