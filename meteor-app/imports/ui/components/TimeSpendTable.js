import React, { Component } from 'react';
import { millisecondsToTime } from '../helpers';
import classNames from 'classnames';

export default class TimeSpendTable extends Component {
  constructor(props) {
    super(props);

    this.state = { column: 0, asc: true };
  }
  onHeaderClick(i) {
    const { column, asc } = this.state;
    if (i === column) {
      this.setState({
        asc: !asc,
        column,
      })
    } else {
      this.setState({
        column: i,
        asc: true
      })
    }
  }
  renderTableHeader() {
    const tableHeader = ['Board', '', 'Board Hours'];

    return tableHeader.map((header, i) => {
      if (header) {
        const { column, asc } = this.state;

        let type = '';
        if (column === i) {
          type = asc ? '-desc' : '-asc';
        }

        const iconClass = classNames('fa', 'pull-right', { [`fa-sort${type}`] : true });

        return (
          <th key={i} onClick={this.onHeaderClick.bind(this, i)}>
            {header}
            <i className={iconClass} aria-hidden="true"></i>
          </th>
        );
      } else {
        return <th key={i}></th>;
      }
    })
  }

  render() {
    const divColorStyle = {
      width: '10px',
      height: '10px',
      display: 'block',
      borderRadius: '50%'
    };

    const { timeByBoard } = this.props;

    const rowKeys = ['name', '', 'time'];

    const { column, asc } = this.state;

    let sortedTimeData = _.sortBy(timeByBoard, rowKeys[column]);
    sortedTimeData = asc ? sortedTimeData : sortedTimeData.reverse();

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
          {sortedTimeData.map((obj, i) =>
            <tr key={i}>
              <td>{obj.name}</td>
              <td className="text-center">
                <div style={Object.assign({}, divColorStyle, { backgroundColor: obj.color })}></div>
              </td>
              <td>{millisecondsToTime(obj.time)}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}
