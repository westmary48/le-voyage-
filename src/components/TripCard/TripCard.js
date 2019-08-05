import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import tripShape from '../../helpers/propz/tripShape';

import './TripCard.scss';


class TripCard extends React.Component {
  static propTypes = {
    trip: tripShape.tripCardShape,
    deleteTrip: PropTypes.func.isRequired,
  }

  deleteThis = (e) => {
    e.preventDefault();
    const { trip, deleteTrip } = this.props;
    deleteTrip(trip.id);
  }

  render() {
    const { trip } = this.props;
    const singleLink = `/trip/${trip.id}`;
    const editLink = `/edit/${trip.id}`;
    return (
      <div href = "#" className="TripCard col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{trip.name}</h5>
            <Link className="btn btn-success" to={singleLink}>View</Link>
            <img className = "card-img" src = {trip.imageUrl} alt = "" />
            <p className="card-text">{trip.description}</p>
            <h6 className="card-image">{trip.startDate}</h6>
            <h6 className="card-title">{trip.endDate}</h6>
            <h6 className="card-title">{trip.city}</h6>
            <h6 className="card-title">{trip.country}</h6>
            <button className="btn btn-danger" onClick={this.deleteThis}>Delete</button>
            <Link className="btn btn-primary" to={editLink}>Edit</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default TripCard;
