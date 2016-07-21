import React, { Component } from 'react';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import TimeSpendTable from './TimeSpendTable';
import randomColor from 'randomcolor';

class TimeTrackStats extends Component {
  componentDidMount() {
    this.props.fetchTime();
  }
  componentWillUpdate({ location, startDate, endDate }) {
    if (this.props.location.query !== location.query) {
      const { fetchTime } = this.props;
      fetchTime(startDate, endDate);
    }
  }
  render() {
    const { timeByDay, timeByBoard, startDate, endDate, isFetching } = this.props;

    if (isFetching || (!timeByDay && !timeByBoard)) {
      return <div>Loading...</div>;
    }

    if (timeByBoard.length && timeByDay.length) {
      const timeByBoardWithColor = timeByBoard.map((item) =>
        Object.assign({}, item, { color: randomColor() })
      );

      return (
        <div>
          <BarChart
            timeByDay={timeByDay}
            startDate={startDate}
            endDate={endDate}/>
          <div className="row">
            <div className="col-sm-6">
              <TimeSpendTable timeByBoard={timeByBoardWithColor}/>
            </div>
            <div className="col-sm-6">
              <DoughnutChart timeByBoard={timeByBoardWithColor}/>
            </div>
          </div>
        </div>
      )
    } else {
      return <div><h4 className="text-center text-muted">No activity</h4></div>;
    }
  }
}

export default TimeTrackStats;
