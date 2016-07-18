import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeSpendTable from '../components/TimeSpendTable';
import TimeTrackStats from '../components/TimeTrackStats';
import DoughnutChart from '../components/DoughnutChart';
import { fetchTime } from '../redux/actions';
import { getInterval } from '../helpers';

class Home extends Component {
  componentDidMount() {
    this.props.fetchTime();
  }
  componentWillUpdate({ location, startDate, endDate }) {
    if (this.props.location.query !== location.query) {
      const { fetchTime } = this.props;
      fetchTime(startDate, endDate);
    }
  }
  renderTimeTrackStats() {
    const { timeByDay, fetchTime, startDate, endDate } = this.props;
      return (
        <TimeTrackStats 
          startDate={startDate}
          endDate={endDate}
          fetchTime={fetchTime}
          timeByDay={timeByDay}/>
      )
  }
  renderDetailedInfo() {
    if (this.props.timeByBoard) {
      return (
        <div className="row">
          <div className="col-sm-6">
            <TimeSpendTable timeByBoard={this.props.timeByBoard}/>
          </div>
          <div className="col-sm-6">
            <DoughnutChart timeByBoard={this.props.timeByBoard}/>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        {this.renderTimeTrackStats()}
        {this.renderDetailedInfo()}
      </div>
    )
  }
}

const mapStateToProps = ({ timeSpend }, { location }) => {
  const { startDate, endDate } = getInterval(location.query);

  return {
    timeByDay: timeSpend.timeByDay,
    timeByBoard: timeSpend.timeByBoard,
    startDate,
    endDate
  }
};

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    fetchTime(startDate, endDate) {
      if (!startDate && !endDate) {
        ({ startDate, endDate } = getInterval(location.query));
      }

      dispatch(fetchTime(startDate, endDate));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);