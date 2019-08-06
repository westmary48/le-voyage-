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
          <div className="col">
            <button className="btn card_btn" onClick={this.editUpcomingTrip}>Edit</button>
            <button className="btn card_btn" onClick={this.deleteUpcomingTrip}>Delete</button>
          </div>
        );
      }
    };
    return (
      <div className="UpcomingTripCard col-6">
          <div class="upcoming-card">
    <div class="cards-item">
        <div className="card-upcoming">
        <img className="card_image" src="https://www.pennmedicine.org/-/media/images/miscellaneous/random%20generic%20photos/person_at_airport_holding_coffee_and_luggage.ashx?mw=620&mh=408"/>
          <div className="card_content">
          <h4 className="card_title">{future.name}</h4>
          <h4 className = "card_text">{future.city}</h4>
          <p className = "card_text">{future.country}</p>
          <p className = "card_text">{future.date}</p>
        </div>
        { makeButtons() }
        </div>
\    </div>
    </div>
    </div>
    );
  }
}

export default UpcomingItem;
