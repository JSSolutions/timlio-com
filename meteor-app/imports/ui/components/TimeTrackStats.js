import React, { Component } from 'react';
import BarChart from './BarChart';
import Calendar from './Calendar';
import UsersFilter from './UsersFilter';
import BoardsFilter from './BoardsFilter';
import DateTimeFormat from 'gregorian-calendar-format';
import { toGregorianCalendar } from '../helpers';
import { withRouter } from 'react-router';

class TimeTrackStats extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(value) {
    const { router } = this.props;
    const formatter = new DateTimeFormat('yyyy-MM-dd');
    const query = {
      'date': formatter.format(value[0]),
      'end_date': formatter.format(value[1])
    };
    router.push({ query })
  }
  render() {
    const { timeByDay, startDate, endDate, fetchTimeByDay } = this.props;
    
    if (timeByDay) {
      return (
        <div>
          <Calendar
            onChange={this.onDateChange}
            value={[toGregorianCalendar(startDate), toGregorianCalendar(endDate)]}/>
          <div className="row margin-bottom">
            <UsersFilter fetchTimeByDay={fetchTimeByDay}/>
            <BoardsFilter fetchTimeByDay={fetchTimeByDay}/>
          </div>
          <BarChart
            timeByDay={timeByDay}
            startDate={startDate}
            endDate={endDate}/>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default withRouter(TimeTrackStats);
