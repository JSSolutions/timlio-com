import React from 'react';
import { Bar } from 'react-chartjs';
import moment from 'moment';

function random(length, max) {
  let arr = [];
  for(let i = 0; i < length; i++)
    arr.push((Math.random() * max))
  return arr;
}

function getChartData(startValue, endValue, data) {
  const startTime = moment(startValue.getTime());
  const endTime = moment(endValue.getTime());
  const diff = endTime.diff(startTime, 'days');

  const days = [];
  days.push(startTime);
  let tempDate = moment(startTime);
  for (let i = 0; i <= diff; i++) {
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

const BarChart = (props) => {
  const { startDate, endDate, timeByDay } = props;

  const days = getChartData(startDate, endDate, timeByDay);
  const data = _.pluck(days, 'time').map((dayTime) => 
    Math.random() * 10);
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
    barStrokeWidth: 1
  };
  return (
    <Bar data={chartData} options={chartOptions} width="860" height="550" redraw/>
  )
};

export default BarChart;