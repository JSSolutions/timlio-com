import React, { Component } from 'react';
import BarChart from './BarChart';
import Calendar from './Calendar';
import UsersFilter from './UsersFilter';
import DateTimeFormat from 'gregorian-calendar-format';
import { toGregorianCalendar, getDatesQuery, getInterval } from '../helpers';
import { withRouter } from 'react-router';

class TimeTrackStats extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
  }
  componentDidMount() {
    const { location } = this.props;
    this.fetchData(location);
  }
  componentWillReceiveProps({ location }) {
    if (this.props.location.query !== location.query) {
      this.fetchData(location)
    }
  }
  fetchData({ query }) {
    const { startDate, endDate } = getInterval(query);
    this.props.fetchTimeByDay(startDate, endDate, Meteor.userId());
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
    const { timeByDay, location } = this.props;
    const { startDate, endDate } = getInterval(location.query);
    
    if (timeByDay) {
      return (
        <div>
          <Calendar
            onChange={this.onDateChange}
            value={[toGregorianCalendar(startDate), toGregorianCalendar(endDate)]}/>

          <UsersFilter/>
            
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
