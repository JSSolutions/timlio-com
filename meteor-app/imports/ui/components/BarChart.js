import React from 'react';
import { Bar } from 'react-chartjs';
import moment from 'moment';

function random(length, max) {
  let arr = [];
  for(let i = 0; i < length; i++)
    arr.push(Math.ceil(Math.random() * max))
  return arr;
}

function getDaysBetween(startValue, endValue) {
  const startTime = moment(startValue.getTime());
  const endTime = moment(endValue.getTime());
  const diff = endTime.diff(startTime, 'days');

  const days = [];
  const format = 'ddd, MMM Do YYYY';
  days.push(startTime.format(format));

  for(let i = 0; i < diff; i++) {
    startTime.add(1, 'days');
    days.push(startTime.format(format));
  }

  return days;
}

const BarChart = (props) => {
  const days = getDaysBetween(props.startValue, props.endValue);
  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'My First dataset',
        fillColor: 'rgba(255,150,132,0.2)',
        strokeColor: 'rgba(255,99,131,0.8)',
        data: random(days.length, 24),
        highlightFill: 'rgba(255,99,132,0.4)',
        highlightStroke: 'rgba(255,99,132,1)'
      }
    ]
  };

  const chartOptions = {
    barStrokeWidth: 1,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };
  return (
    <Bar data={chartData} options={chartOptions} width="860" height="550" redraw/>
  )
};

export default BarChart;