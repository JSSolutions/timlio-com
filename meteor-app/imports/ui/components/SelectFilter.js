import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class SelectFilter extends Component {
  render() {
    return (
      <div className="col-sm-4 margin-bottom">
        <label>{this.props.label}</label>
        <Select
          multi={this.props.multi}
          placeholder={this.props.placeholder}
          value={this.props.value || []}
          options={this.props.options}
          onChange={this.props.onChange}/>
      </div>
    )
  }
}