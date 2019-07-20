/* eslint-disable indent */
/* eslint-disable max-len */
import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

// import SearchField from 'react-search-field';

import Search from '../Search/Search';

import tripData from '../../helpers/data/tripData';

import TripCard from '../TripCard/TripCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    trips: [],
    filteredTrips: [],
  }

  getTrips = () => {
    const { uid } = firebase.auth().currentUser;
    tripData.getMyTrips(uid).then((trips) => {
      this.setState({ trips });
      this.setState({ filteredTrips: trips });
    })
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

  searchTrips(query) {
      const trips = this.state.filteredTrips.filter(trip => trip.name.includes(query));
      this.setState({ trips });
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
        <Search searchTrips ={this.searchTrips.bind(this)}/>
        {/* <SearchField
            placeholder="Search trips"
            onChange={ this.onChange }
            searchText=""
            classNames="search-bar"
          /> */}
        <h1>Home</h1>
        <div className="d-flex flex-wrap">
          {makeTripCards}
        </div>
      </div>
    );
  }
}

export default Home;
