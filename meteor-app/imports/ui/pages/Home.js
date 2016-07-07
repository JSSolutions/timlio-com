import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeSpendTable from '../components/TimeSpendTable';
import TimeTrackStats from '../components/TimeTrackStats';
import DoughnutChart from '../components/DoughnutChart';
import { fetchTimeByDay, fetchTimeByBoard } from '../redux/actions';
import { getInterval } from '../helpers';

class Home extends Component {
  componentDidMount() {
    const { fetchTimeByBoard, fetchTimeByDay } = this.props;
    fetchTimeByBoard();
    fetchTimeByDay();
  }
  componentWillReceiveProps({ location }) {
    if (this.props.location.query !== location.query) {
      this.props.fetchTimeByDay();
    }
  }
  renderTimeTrackStats() {
    const { timeByDay, fetchTimeByDay, startDate, endDate } = this.props;
      return (
        <TimeTrackStats 
          startDate={startDate}
          endDate={endDate}
          fetchTimeByDay={fetchTimeByDay}
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
    fetchTimeByDay() {
      const { startDate, endDate } = getInterval(location.query);
      dispatch(fetchTimeByDay(startDate, endDate));
    },
    fetchTimeByBoard() {
      dispatch(fetchTimeByBoard(Meteor.userId()));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);