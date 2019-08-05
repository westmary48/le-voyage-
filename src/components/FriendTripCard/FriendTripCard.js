import React from 'react';
// import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';
import tripShape from '../../helpers/propz/tripShape';


class FriendTripCard extends React.Component {
  static propTypes = {
    trip: tripShape.tripCardShape,
  }

  render() {
    const { trip } = this.props;
    return (
      <div className="TripCard col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{trip.name}</h5>
            <p className="card-text">{trip.description}</p>
            <img className = "card-img" src = {trip.imageUrl} alt = "" />
            <h6 className="card-title">{trip.startDate}</h6>
            <h6 className="card-title">{trip.endDate}</h6>
            <h6 className="card-title">{trip.city}</h6>
            <h6 className="card-title">{trip.country}</h6>
            <button className="btn btn-danger" onClick={this.deleteThis}>Delete</button>
            </div>
        </div>
      </div>
    );
  }
}

export default FriendTripCard;
