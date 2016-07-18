import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Filter from './SelectFilter';
import { setUsers } from '../redux/actions';

class UsersFilter extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps({ selectedUsers }) {
    if (this.props.selectedUsers !== selectedUsers) {
      this.props.fetchTimeByDay();
    }
  }
  onChange(selectedUsers) {
    this.props.dispatch(setUsers(selectedUsers || []));
  }
  render() {
    const { users, selectedUsers } = this.props;
    const options = users.filter((user) => 
      !!user.profile
    ).map((user) => ({
      value: user._id,
      label: user.profile.name
    }));

    return (
      <Filter
        placeholder="All Users"
        value={selectedUsers}
        onChange={this.onChange} 
        options={options} 
        label="Users"/>
    )
  }
}

const mapStateToProps = ({ selectedUsers }, { users, fetchTimeByDay }) => ({
  fetchTimeByDay,
  users,
  selectedUsers
});

const MeteorContainer = createContainer(() => {
  const usersHandle = Meteor.subscribe('accessedUsers');
  const userExists = usersHandle.ready();

  return {
    users: userExists ? Meteor.users.find().fetch() : []
  }
}, UsersFilter);

export default connect(mapStateToProps)(MeteorContainer);