import React from 'react';
import './TripMapCard.scss';

class TripMapCard extends React.Component {
  render() {
    const { trip } = this.props;

    return (
      <div>
          <h5>{trip.name}</h5>
          <p>Description {trip.description}</p>
      </div>
    );
  }
}

export default TripMapCard;
