import React, { Component } from 'react';
import { render } from 'react-dom';
import BarChart from '../components/BarChart';
import Calendar from '../components/Calendar';
import GregorianCalendar from 'gregorian-calendar';
import enUS from 'gregorian-calendar/lib/locale/en_US';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
    const endValue = new GregorianCalendar(enUS);
    endValue.setTime(new Date());
    const startValue = new GregorianCalendar(enUS);
    startValue.setTime(moment().subtract(6, 'days'));

    this.state = {
      startValue,
      endValue
    };
  }
  onChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  render() {
    return (
      <div>
        <Calendar onChange={this.onChange.bind(this)} {...this.state}/>
        <BarChart {...this.state}/>
      </div>
    )
  }
}

export default Home;