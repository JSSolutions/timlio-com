import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import enUs from 'gregorian-calendar/lib/locale/en_US'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';

const now = new GregorianCalendar(enUs);
now.setTime(Date.now());

class Picker extends Component {
  render() {
    const props = this.props;
    const formatter = new DateTimeFormat('E, MMM d yyyy');
    const calendar = (<Calendar
      locale={CalendarLocale}
      defaultValue={now}
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
  disabledEndDate(endValue) {
    if (!endValue) {
      return false;
    }
    const { startValue } = this.props;
    if (!startValue) {
      return false;
    }
    return endValue.compareToDay(startValue) <= 0;
  }
  disabledStartDate(startValue) {
    if (!startValue) {
      return false;
    }
    const { endValue } = this.props;
    if (!endValue) {
      return false;
    }
    return startValue.compareToDay(endValue) >= 0;
  }
  render() {
    const { onChange } = this.props;
    return (
      <div>
        <Picker
          disabledDate={this.disabledStartDate.bind(this)}
          value={this.props.startValue}
          onChange={onChange.bind(null, 'startValue')}
        />
        <Picker
          disabledDate={this.disabledEndDate.bind(this)}
          value={this.props.endValue}
          onChange={onChange.bind(null, 'endValue')}
        />
    </div>);
  }
}

export default Interval;
