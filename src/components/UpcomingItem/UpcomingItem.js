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
    const { deleteSingleUpcoming, future } = this.props;
    deleteSingleUpcoming(future.id);
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
            <button className="btn btn-default" onClick={this.editUpcomingTrip}>
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-default" onClick={this.deleteUpcomingTrip}>
              <i className="fas fa-trash-alt"></i>
            </button>
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
