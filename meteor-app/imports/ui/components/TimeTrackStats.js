import React, { Component } from 'react';
import BarChart from './BarChart';
import Calendar from './Calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import enUS from 'gregorian-calendar/lib/locale/en_US';
import moment from 'moment';
import { getRange } from '../redux/reducers';
import { withRouter } from 'react-router';
import { toUnderscore } from '../helpers';

const toGregorianCalendar = (value) => {
  const calendar = new GregorianCalendar(enUS);
  calendar.setTime(moment(value).add(1, 'days'));

  return calendar;
};

const getDatesQuery = ({ query }) => {
  const { startDate, endDate } = getRange(query);
  const momentFormat = 'YYYY-MM-DD';
  return {
    'start_date': startDate.format(momentFormat),
    'end_date': endDate.format(momentFormat)
  }
};

class TimeTrackStats extends Component {
  onChange(field, value) {
    const { router, location, fetchTimeByDay } = this.props;
    const formatter = new DateTimeFormat('yyyy-MM-dd');
    const query = Object.assign({},
      getDatesQuery(location),
      { [toUnderscore(field)]: formatter.format(value) }
    );

    router.push({
      query
    });
    
    fetchTimeByDay();
  }
  render() {
    const { timeByDay, location } = this.props;
    const { startDate, endDate } = getRange(location.query);
    
    return (
      <div>
        <Calendar 
          onChange={this.onChange.bind(this)} 
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
