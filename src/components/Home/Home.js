/* eslint-disable indent */
/* eslint-disable max-len */
import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

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
      const trips = this.state.filteredTrips.filter(trip => trip.name.includes(query)
      || trip.description.includes(query) || trip.endDate.includes(query) || trip.city.includes(query) || trip.country.includes(query) || trip.startDate.includes(query));
      this.setState({ trips });
    }

    changeView = (e) => {
      const view = e.currentTarget.id;
      this.props.history.push(`/${view}`);
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
        <h1>Home</h1>
        <div className="d-flex flex-wrap">
          {makeTripCards}
        </div>
        {/* <div className="card border-dark" id='friends' onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-user-friends fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Friends</h6>
              <p className="card-text">Friend List</p>
            </div>
          </div> */}
      </div>
    );
  }
}

export default Home;
