import React from 'react';
import PropTypes from 'prop-types';

import upcomingShape from '../../helpers/propz/upcomingShape';
import authRequests from '../../helpers/data/authRequests';

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
    const { future } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (future.uid === uid) {
        return (
          <div className="col-2">
            <button className="btn btn-primary" onClick={this.editUpcomingTrip}>Edit</button>
            <button className="btn btn-danger" onClick={this.deleteUpcomingTrip}>Delete</button>
          </div>
        );
      }
      return <div className="col-2"></div>;
    };
    return (
      <li className="upcoming-item text-center">
        <div className="col-9">
          <h4>{future.name}</h4>
          <p>{future.city}</p>
          <p>{future.country}</p>
          <p>{future.startDate}</p>
          <p>{future.endDate}</p>
        </div>
        { makeButtons() }
      </li>
    );
  }
}

export default UpcomingItem;
