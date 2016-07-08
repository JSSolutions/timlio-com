import 'rc-calendar/assets/index.css';
import './Calendar.css';
import React, { Component } from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';

const formatter = new DateTimeFormat('E, MMM d yyyy');

function isValidRange(v) {
  return v && v[0] && v[1];
}
function format(v) {
  return v ? formatter.format(v) : '';
}

class Interval extends Component {
  render() {
    const props = this.props;

    const calendar = (<RangeCalendar
      showWeekNumber={false}
      locale={CalendarLocale}
      formatter={formatter}
      showOk={false}
    />);

    return (<DatePicker
      animation="slide-up"
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}
    >
      {({ value }) => {
        return (
          <div className="row margin-bottom">
            <div className="col-sm-4">
              <div className="input-group">
                <input
                  disabled={props.disabled}
                  readOnly
                  className="form-control"
                  value={isValidRange(value) && `${format(value[0])} - ${format(value[1])}`}
                />
                <div className="input-group-addon"><i className="fa fa-calendar" aria-hidden="true"></i></div>
              </div>
            </div>
          </div>);
      }}
    </DatePicker>);
  }
}

Interval.defaultProps = {
  disabled: false
};

export default Interval;
