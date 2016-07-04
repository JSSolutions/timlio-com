import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { getUserCardsTime, getUserBoardsTime, getUserTimeByDates} from '../../api/time-track-entries/methods';
import TimeSpendTable from '../components/TimeSpendTable';
import TimeTrackStats from '../components/TimeTrackStats';
import DoughnutChart from '../components/DoughnutChart';
import { randomColor } from '../helpers';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    getUserBoardsTime.call({ userId: Meteor.userId() }, (err, result) => {
      const data = result.map((item) => {
        const color = randomColor();
        return Object.assign(item, {
          color
        });
      });
      
      this.setState({
        data
      })
    });
  }
  
  render() {
    return (
      <div>
        <TimeTrackStats/>
        <TimeSpendTable {...this.state}/>
        <DoughnutChart {...this.state}/>
      </div>
    )
  }
}

export default createContainer(() => {
  const cardsHandle = Meteor.subscribe('cards');
  const loading = !cardsHandle.ready();
  return {
    loading
  }
}, Home);