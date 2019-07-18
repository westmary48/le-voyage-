import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import tripData from '../../helpers/data/tripData';

import TripCard from '../TripCard/TripCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    trips: [],
  }

  getTrips = () => {
    const { uid } = firebase.auth().currentUser;
    tripData.getMyTrips(uid)
      .then(trips => this.setState({ trips }))
      .catch(err => console.error('could not get trips', err));
  }

  componentDidMount() {
    this.getTrips();
  }

  deleteTrip = (tripId) => {
    tripData.deleteTrip(tripId)
      .then(() => this.getTrips())
      .catch(err => console.error('unable to delete', err));
  }


  render() {
    const makeTripCards = this.state.trips.map(trip => (
      <TripCard
        key={trip.id}
        trip={trip}
        deleteTrip={this.deleteTrip}
      />
    ));
    return (
      <div className="Home col">
        <h1>Home</h1>
        <div className="d-flex flex-wrap">
          {makeTripCards}
        </div>
      </div>
    );
  }
}

export default Home;
