import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeSpendTable from '../components/TimeSpendTable';
import TimeTrackStats from '../components/TimeTrackStats';
import DoughnutChart from '../components/DoughnutChart';
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

const mapStateToProps = ({ timeSpend }) => ({
  timeByDay: timeSpend.timeByDay,
  timeByBoard: timeSpend.timeByBoard
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