import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TimeSpendTable from '../components/TimeSpendTable';
import TimeTrackStats from '../components/TimeTrackStats';
import DoughnutChart from '../components/DoughnutChart';
import { randomColor } from '../helpers';
import { getRange } from '../redux/reducers';
import { fetchTimeByDay, fetchTimeByBoard } from '../redux/actions';

class Home extends Component {
  componentDidMount() {
    this.props.fetchTimeByBoard();
    this.props.fetchTimeByDay();
  }
  renderTimeTrackStats() {
    const { timeByDay, fetchTimeByDay } = this.props;
    if (this.props.timeByDay) {
      return (
        <TimeTrackStats 
          fetchTimeByDay={fetchTimeByDay.bind(this)} 
          timeByDay={timeByDay}/>
      )
    }
  }
  renderDetailedInfo() {
    if (this.props.timeByBoard) {
      return (
        <div>
          <TimeSpendTable timeByBoard={this.props.timeByBoard}/>
          <DoughnutChart timeByBoard={this.props.timeByBoard}/>
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

const mapStateToProps = (state) => ({
  timeByDay: state.timeByDay,
  timeByBoard: state.timeByBoard && state.timeByBoard.map((time) => {
    const color = randomColor();
    return Object.assign(time, {
      color
    });
  })
});

const mapDispatchToProps = (dispatch, { location }) => {
  const { startDate, endDate } = getRange(location.query);
  
  return {
    fetchTimeByDay() {
      dispatch(fetchTimeByDay(startDate, endDate, Meteor.userId()));
    },
    fetchTimeByBoard() {
      dispatch(fetchTimeByBoard(Meteor.userId()));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);