import React, { Component } from 'react';
import GregorianCalendar from 'gregorian-calendar';
import enUS from 'gregorian-calendar/lib/locale/en_US';
import moment from 'moment';
import BarChart from './BarChart';
import Calendar from './Calendar';
import { getUserTimeByDates } from '../../api/time-track-entries/methods';

export default class TimeTrackStats extends Component {
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
  componentDidMount() {
    getUserTimeByDates.call({
      startDate: new Date(this.state.startValue.getTime()), endDate: new Date(this.state.endValue.getTime()), userId: Meteor.userId()
    }, (err, result) => {
      if (err) {
        throw err;
      }
      
      this.setState(Object.assign({}, this.state, { data: result }));
    });
  }
  onChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  renderChart() {
    if (this.state.data) {
      return (<BarChart {...this.state}/>);
    }
  }
  render() {
    return (
      <div>
        <Calendar onChange={this.onChange.bind(this)} {...this.state}/>
        {this.renderChart()}
      </div>
    )
  }
}