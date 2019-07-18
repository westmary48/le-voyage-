import React from 'react';

import { Link } from 'react-router-dom';

class TripCard extends React.Component {
  render() {
    const { trip } = this.props;
    const singleLink = `/trip/${trip.id}`;
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
            <Link className="btn btn-success" to={singleLink}>View</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default TripCard;
