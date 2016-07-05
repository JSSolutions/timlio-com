import React, { Component } from 'react';
import BarChart from './BarChart';
import Calendar from './Calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import { toGregorianCalendar, getDatesQuery, getInterval } from '../helpers';
import { withRouter } from 'react-router';
import { toUnderscore } from '../helpers';

class TimeTrackStats extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(field, value) {
    const { router, location, fetchTimeByDay } = this.props;
    const formatter = new DateTimeFormat('yyyy-MM-dd');
    const query = Object.assign({},
      getDatesQuery(location),
      { [toUnderscore(field)]: formatter.format(value) }
    );

    router.push({ query });
    
    fetchTimeByDay();
  }
  render() {
    const { timeByDay, location } = this.props;
    const { startDate, endDate } = getInterval(location.query);
    
    return (
      <div>
        <Calendar 
          onChange={this.onChange}
          startDate={toGregorianCalendar(startDate)}
          endDate={toGregorianCalendar(endDate)}/>
        <BarChart 
          timeByDay={timeByDay} 
          startDate={startDate} 
          endDate={endDate}/>
      </div>
    )
  }
}

export default withRouter(TimeTrackStats);
