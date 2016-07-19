import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import moment from 'moment';
import { millisecondsToTime } from '../helpers';

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
    const data = _.pluck(days, 'time');
    
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
      scaleLabel({ value }) {
        return millisecondsToTime(value);
      },


      responsive: true,
      maintainAspectRatio: false,
      barStrokeWidth: 1,
      customTooltips(tooltip) {
        const tooltipEl = $('#bar-tooltip');
        if (!tooltip) {
          tooltipEl.css({
            opacity: 0
          });
          return;
        }

        tooltipEl.removeClass('above below');
        tooltipEl.addClass(tooltip.yAlign);

        const parts = tooltip.text.split(':');
        const innerHtml = `<span>${parts[0].trim()}</span> : <span><b>${millisecondsToTime(parts[1].trim())}</b></span>`;
        tooltipEl.html(innerHtml);

        tooltipEl.css({
          opacity: 1,
          left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
          top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
          fontFamily: tooltip.fontFamily,
          fontSize: tooltip.fontSize,
          fontStyle: tooltip.fontStyle
        });
      },

    };

    const tooltipStyle = {
      position: 'absolute',
      backgroundColor: 'black',
      color: 'white',
      borderRadius: '5px',
      padding: '5px',
      opacity: 0
    };

    return (
      <div className="row margin-bottom" style={{height: 375}}>
        <Bar data={chartData} options={chartOptions} redraw/>
        <div id="bar-tooltip" style={tooltipStyle}></div>
      </div>
    )
  }
}
