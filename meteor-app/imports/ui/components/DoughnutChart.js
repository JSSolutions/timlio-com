import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs';
import { millisecondsToTime } from '../helpers';
import { randomColor } from '../helpers';

export default class DoughnutChart extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.timeByBoard !== this.props.timeByBoard;
  }
  render() {
    const chartData = this.props.timeByBoard.map((item) => {
      return {
        value: item.time,
        color: randomColor(),
        label: item.name
      }
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      customTooltips(tooltip) {
        const tooltipEl = $('#doughnut-tooltip');
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
      }
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
      <div style={{height: 350}}>
        <Doughnut data={chartData} options={chartOptions} width="300" height="300" redraw/>
        <div id="doughnut-tooltip" style={tooltipStyle}></div>
      </div>
    )
  }
}
