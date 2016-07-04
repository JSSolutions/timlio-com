import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarChart from './BarChart';
import Calendar from './Calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import { getRange } from '../redux/reducers';
import { fetchTimeByDay } from '../redux/actions';
import { withRouter } from 'react-router';
import { toUnderscore } from '../helpers';

export default class TimeTrackStats extends Component {
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { startDate, endDate, dispatch } = this.props;
    dispatch(fetchTimeByDay(startDate, endDate, Meteor.userId()));
  }
  onChange(field, value) {
    const { router } = this.props;
    const formatter = new DateTimeFormat('yyyy-MM-dd');
    router.push({
      query: {
        [toUnderscore(field)]: formatter.format(value)
      }
    });
    
  }
  renderChart() {
    if (this.props.timeByDay) {
      return (<BarChart {...this.props}/>);
    }
  }
  render() {
    return (
      <div>
        <Calendar onChange={this.onChange.bind(this)} {...this.props}/>
        {this.renderChart()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { startDate, endDate } = getRange(state);
  
  return {
    startDate,
    endDate,
    timeByDay: state.timeByDay
  }
};

export default withRouter(connect(mapStateToProps)(TimeTrackStats));