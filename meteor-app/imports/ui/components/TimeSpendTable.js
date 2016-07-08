import React, { Component } from 'react';
import { millisecondsToTime } from '../helpers';

export default class TimeSpendTable extends Component {
  render() {
    const divColorStyle = {
      width: '10px',
      height: '10px',
      display: 'block',
      borderRadius: '50%'
    };
    
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Board</th>
              <th></th>
              <th>Board Hours</th>
            </tr>
          </thead>
          <tbody>
          {this.props.timeByBoard.map((obj, i) =>
            <tr key={i}>
              <td>{obj.name}</td>
              <td><div style={
                Object.assign({}, divColorStyle, { backgroundColor: obj.color })}></div>
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
