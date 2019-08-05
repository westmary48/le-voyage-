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
      <div className="UpcomingTripCard col-12">
          <ul class="cards">
    <li class="cards_item">
        <div className="card">
        <img class="card_image" src="https://picsum.photos/500/300/?image=10"/>
          <div className="card_content">
          <h4 className="card_title">{future.name}</h4>
          <h4 className = "card_text">{future.city}</h4>
          <p className = "card_text">{future.country}</p>
          <p className = "card_text">{future.date}</p>
        </div>
        { makeButtons() }
        </div>
    </li>
    </ul>
    </div>
    );
  }
}

export default UpcomingItem;
