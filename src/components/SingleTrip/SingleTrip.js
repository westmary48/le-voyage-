import React from 'react';

import tripData from '../../helpers/data/tripData';

import './SingleTrip.scss';

class SingleTrip extends React.Component {
  state = {
    trip: {},
  }

  componentDidMount() {
    const tripId = this.props.match.params.id;
    tripData.getSingleTrip(tripId)
      .then(tripPromise => this.setState({ trip: tripPromise.data }))
      .catch(err => console.error('unable to get single trip', err));
  }

  render() {
    const { trip } = this.state;
    return (
      <div className="SingleTrip">
        <h1>{trip.name}</h1>
        <h2>{trip.description}</h2>
        <img className = "singleImg" src = {trip.imageUrl} alt = ""/>
        <h4>{trip.startDate}</h4>
        <h5>{trip.endDate}</h5>
        <h5>{trip.city}</h5>
        <h5>{trip.country}</h5>
      </div>
    );
  }
}

export default SingleTrip;
