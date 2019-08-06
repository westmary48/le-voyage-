import React from 'react';

import { Link } from 'react-router-dom';

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

  deleteTrip = () => {
    const tripId = this.props.match.params.id;
    tripData.deleteTrip(tripId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to delete', err));
  }

  render() {
    const { trip } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
      <div className="SingleTrip">
        <div className = "singleCard">
        <h3 className = "singleName">{trip.name}</h3>
        <div className = "col">
        <h6 className = "singleColor">{trip.description}</h6>
        </div>
        <div className = "col">
        <h6 className = "singleColor">{trip.startDate}</h6>
        </div>
        <div className = "col">
        <h6 className = "singleColor">{trip.endDate}</h6>
        </div>
        <div className = "col">
        <h6 className = "singleColor">{trip.city}</h6>
        </div>
        <div className = "col">
        <h6 className = "singleColor">{trip.country}</h6>
        </div>
        <img className = "singleImg" src = {trip.imageUrl} alt = ""/>
        <div className = "col">
        <Link className="btn btn-info" to={editLink}>Edit</Link>
        <button className="btn btn-danger" onClick={this.deleteTrip}>Delete</button>
        </div>
        </div>
      </div>
    );
  }
}

export default SingleTrip;
