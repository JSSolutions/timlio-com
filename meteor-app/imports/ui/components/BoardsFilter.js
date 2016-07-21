import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Filter from './SelectFilter';
import { setBoards } from '../redux/actions';
import { Boards } from '../../api/boards/boards';

class BoardsFilter extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps({ selectedBoards }) {
    if (this.props.selectedBoards !== selectedBoards) {
      this.props.fetchTime();
    }
  }
  onChange(selectedBoards) {
    this.props.dispatch(setBoards(selectedBoards || []));
  }
  render() {
    const { boards, selectedBoards } = this.props;
    const options = boards.map((board) => ({
      value: board._id,
      label: board.name
    }));

    return (
      <Filter
        multi={true}
        placeholder="All Boards"
        value={selectedBoards}
        onChange={this.onChange}
        options={options}
        label="Boards"/>
    )
  }
}

const mapStateToProps = ({ selectedBoards }, { boards, fetchTime }) => ({
  boards,
  selectedBoards,
  fetchTime
});

const MeteorContainer = createContainer(() => {
  const boardsHandle = Meteor.subscribe('accessedBoards');
  const boardsExists = boardsHandle.ready();
  return {
    boards: boardsExists ? Boards.find().fetch() : []
  }
}, BoardsFilter);

export default connect(mapStateToProps)(MeteorContainer);