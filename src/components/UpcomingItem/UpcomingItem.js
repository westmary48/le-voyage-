import React from 'react';
import PropTypes from 'prop-types';

// import CountDown from 'react-native-countdown-component';
import upcomingShape from '../../helpers/propz/upcomingShape';
import authRequests from '../../helpers/data/authRequests';

import Clock from '../Clock/Clock';

import './UpcomingItem.scss';

class UpcomingItem extends React.Component {
  static propTypes = {
    future: upcomingShape.upcomingCardShape,
    deleteSingleUpcoming: PropTypes.func,
    passUpcomingToEdit: PropTypes.func,
  }

  deleteUpcomingTrip = (e) => {
    e.preventDefault();
    const { deleteUpcoming, future } = this.props;
    deleteUpcoming(future.id);
  }

  editUpcomingTrip = (e) => {
    e.preventDefault();
    const { passUpcomingToEdit, future } = this.props;
    passUpcomingToEdit(future.id);
  }

  render() {
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    const { future } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (future.uid === uid) {
        return (
          <div className="col">
            <button className="btn btn-primary" onClick={this.editUpcomingTrip}>Edit</button>
            <button className="btn btn-danger" onClick={this.deleteUpcomingTrip}>Delete</button>
          </div>
        );
      }
    };
    return (
      <div className="UpcomingTripCard col-12">
        <div className="card">
          <div className="card-body">
          <h4>{future.name}</h4>
          <p>{future.city}</p>
          <p>{future.country}</p>
          <p>{future.startDate}</p>
        </div>
        { makeButtons() }
        <h2>Countdown</h2>
        <Clock date={`${year}-12-24T00:00:00`} />
      </div>
      </div>
    );
  }
}

export default UpcomingItem;
