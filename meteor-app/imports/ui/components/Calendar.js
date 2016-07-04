import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';

class Picker extends Component {
  render() {
    const props = this.props;
    const formatter = new DateTimeFormat('E, MMM d yyyy');
    const calendar = (<Calendar
      locale={CalendarLocale}
      formatter={formatter}
      timePicker={null}
      disabledDate={props.disabledDate}
    />);
    return (<DatePicker
      animation="slide-up"
      disabled={props.disabled}
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}
    >
      {({ value }) => {
        return (
          <span>
            <input
              style={{ width: 250, textAlign: 'center' }}
              disabled={props.disabled}
              readOnly
              value={value && formatter.format(value) || ''}
            />
          </span>
        );
      }}
    </DatePicker>);
  }
}

Picker.defaultProps = {
  disabled: false
};

class Interval extends Component {
  disabledEndDate(endDate) {
    if (!endDate) {
      return false;
    }
    const { startDate } = this.props;
    if (!startDate) {
      return false;
    }
    return endDate.compareToDay(startDate) <= 0;
  }
  disabledStartDate(startDate) {
    if (!startDate) {
      return false;
    }
    const { endDate } = this.props;
    if (!endDate) {
      return false;
    }
    return startDate.compareToDay(endDate) >= 0;
  }
  render() {
    const { onChange } = this.props;
    return (
      <div>
        <Picker
          disabledDate={this.disabledStartDate.bind(this)}
          value={this.props.startDate}
          onChange={onChange.bind(null, 'startDate')}
        />
        <Picker
          disabledDate={this.disabledEndDate.bind(this)}
          value={this.props.endDate}
          onChange={onChange.bind(null, 'endDate')}
        />
    </div>);
  }
}

export default Interval;
