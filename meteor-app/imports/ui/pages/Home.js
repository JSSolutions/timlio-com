import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeSpendTable from '../components/TimeSpendTable';
import TimeTrackStats from '../components/TimeTrackStats';
import DoughnutChart from '../components/DoughnutChart';
import { randomColor } from '../helpers';
import { fetchTimeByDay, fetchTimeByBoard } from '../redux/actions';

class Home extends Component {
  componentDidMount() {
    const { fetchTimeByBoard } = this.props;
    fetchTimeByBoard();
  }
  renderTimeTrackStats() {
    const { timeByDay, fetchTimeByDay } = this.props;
      return (
        <TimeTrackStats 
          fetchTimeByDay={fetchTimeByDay}
          timeByDay={timeByDay}/>
      )
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

const mapStateToProps = ({ timeSpend }) => ({
  timeByDay: timeSpend.timeByDay,
  timeByBoard: timeSpend.timeByBoard && timeSpend.timeByBoard.map((time) => {
    const color = randomColor();
    return Object.assign(time, { color });
  })
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTimeByDay(startDate, endDate, userId) {
      dispatch(fetchTimeByDay(startDate, endDate, userId));
    },
    fetchTimeByBoard() {
      dispatch(fetchTimeByBoard(Meteor.userId()));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);