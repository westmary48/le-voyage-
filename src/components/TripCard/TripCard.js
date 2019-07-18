import React from 'react';

class TripCard extends React.Component {
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
            </div>
        </div>
      </div>
    );
  }
}

export default TripCard;
