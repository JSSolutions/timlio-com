import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import moment from 'moment';

function getChartData(startValue, endValue, data) {
  const diff = endValue.diff(startValue, 'days');

  const days = [];
  days.push(startValue);
  let tempDate = moment(startValue);
  for (let i = 0; i < diff; i++) {
    tempDate.add(1, 'days');
    days.push(moment(tempDate));
  }
  const format = 'ddd, MMM Do';
  
  return days.map((day) => {
    const found = data.find((item) => {
      const tempDay = moment([item.year, item.month - 1, item.day]);
      return tempDay.startOf('day').isSame(day.startOf('day'));
    });
    return {
      format: day.format(format),
      time: found ? found.time : 0
    }
  });
}

export default class BarChart extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.timeByDay !== this.props.timeByDay;
  }
  render() {
    const { startDate, endDate, timeByDay } = this.props;

    const days = getChartData(startDate, endDate, timeByDay);
    const data = _.pluck(days, 'time').map((dayTime) =>
    dayTime / 1000 / 3600);
    
    const chartData = {
      labels: _.pluck(days, 'format'),
      datasets: [
        {
          data,
          fillColor: 'rgba(255,150,132,0.2)',
          strokeColor: 'rgba(255,99,131,0.8)',
          highlightFill: 'rgba(255,99,132,0.4)',
          highlightStroke: 'rgba(255,99,132,1)'
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      barStrokeWidth: 1
    };

    return (
      <div className="row margin-bottom" style={{height: 375}}>
        <Bar data={chartData} options={chartOptions} redraw/>
      </div>
    )
  }
}
