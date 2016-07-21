import React, { Component } from 'react';
import Calendar from './Calendar';
import UsersFilter from './UsersFilter';
import BoardsFilter from './BoardsFilter';
import { toGregorianCalendar } from '../helpers';
import DateTimeFormat from 'gregorian-calendar-format';
import { withRouter } from 'react-router';

export default class Filters extends Component {
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
    router.push({ query });
  }
  render() {
    const { fetchTime, startDate, endDate } = this.props;

    return (
      <div>
        <Calendar
          onChange={this.onDateChange}
          value={[toGregorianCalendar(startDate), toGregorianCalendar(endDate)]}/>
        <div className="row margin-bottom">
          <UsersFilter fetchTime={fetchTime}/>
          <BoardsFilter fetchTime={fetchTime}/>
        </div>
      </div>
    )
  }
}


export default withRouter(Filters);